import { Box, Button, Typography } from "@mui/material";
import { styled } from "styled-components";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { requestLoginKey } from "@/api/methods/auth";
import { checkAuth, login } from "@/actions/authActions";
import { useNavigate } from "react-router-dom";
import { CREATE_COMPANY_ROUTE, DASHBOARD_ROUTE } from "@/router/routes";

const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Content = styled(Box)`
  background-color: rgb(23 23 28);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  padding: 16px;
  width: 420px;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled(Box)`
  margin-top: 16px;
`;

export const Login: React.FC = () => {
  const { setVisible } = useWalletModal();

  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [signInRequested, setSignInRequested] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const {
        data: { key },
      } = await requestLoginKey(wallet.publicKey?.toBase58()!);

      if (!wallet.publicKey || !wallet.signMessage) return;

      const message = {
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: key,
      };

      const data = new TextEncoder().encode(
        `${message.nonce}:${message.statement}`
      );
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      await dispatch(
        login({
          signature: serializedSignature,
          wallet: wallet.publicKey?.toBase58()!,
        })
      );

      const user = dispatch(checkAuth());

      if (user.companyId) {
        navigate(DASHBOARD_ROUTE);
      } else {
        navigate(CREATE_COMPANY_ROUTE);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSelectWallet = () => {
    setSignInRequested(true);

    if (!wallet.wallet) {
      setVisible(true);
    } else if (signInRequested) {
      handleSignIn();
    }
  };

  useEffect(() => {
    if (
      wallet.wallet &&
      !wallet.connected &&
      !wallet.connecting &&
      signInRequested
    ) {
      wallet.connect();
    }
  }, [wallet, signInRequested]);

  useEffect(() => {
    if (wallet.connected) {
      handleSignIn();
    }
  }, [wallet, signInRequested]);

  return (
    <Container>
      <Content>
        <Typography variant="h4" fontWeight="bold">
          Connect
        </Typography>
        <ContentWrapper>
          <Button
            onClick={() => handleSelectWallet()}
            variant="contained"
            fullWidth
            disabled={loading}
          >
            <Typography color="#fff">Connect Wallet</Typography>
          </Button>
        </ContentWrapper>
      </Content>
    </Container>
  );
};
