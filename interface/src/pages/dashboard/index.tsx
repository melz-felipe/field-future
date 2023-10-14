import { Box, Button, Typography } from "@mui/material";
import { styled } from "styled-components";
import {
  WalletMultiButton,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { requestLoginKey } from "@/api/methods/auth";
import { checkAuth, login } from "@/actions/authActions";
import { USER_KEY } from "@/services/localStorage/keys";

const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TopContent = styled(Box)`
  width: 420px;
  margin-bottom: 16px;
`;

const Content = styled(Box)`
  background-color: #343434;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  padding: 16px;
  width: 420px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled(Box)`
  margin-top: 16px;
`;

const ButtonWrapper = styled(Box)`
  margin-left: -16px;
`;

export const Dashboard: React.FC = () => {
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const wallet = useWallet();
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
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
  };

  return (
    <Container>
      <TopContent>
        <ButtonWrapper>
          <WalletMultiButton />
        </ButtonWrapper>
      </TopContent>
      <Content>
        <Typography variant="h5">Sign In</Typography>
        <ContentWrapper>
          {wallet.connected ? (
            <Button
              onClick={() => handleSignIn()}
              variant="contained"
              fullWidth
            >
              <Typography color="#fff">Sign in</Typography>
            </Button>
          ) : (
            <Button variant="contained" fullWidth disabled>
              <Typography color="#fff">Wallet not connected</Typography>
            </Button>
          )}
        </ContentWrapper>
      </Content>
    </Container>
  );
};
