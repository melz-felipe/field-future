import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch } from "@/store";
import { useEffect, useMemo, useState } from "react";
import { logout } from "@/actions/authActions";
import { createCompany } from "@/api/methods/company";

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
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
`;

export const CreateCompany: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [wallets, setWallets] = useState<string[]>([]);
  const [neededSignatures, setNeededSignatures] = useState("1");

  const isValid = useMemo(() => {
    return (
      userName &&
      companyName &&
      wallets.length + 1 >= Number(neededSignatures) &&
      wallets.every((wallet) => wallet)
    );
  }, [userName, companyName, wallets, neededSignatures]);

  const handleCreateCompany = async () => {
    setLoading(true);
    try {
      await createCompany({
        companyName,
        wallets: [wallet.publicKey?.toBase58()!, ...wallets],
        neededSignatures: Number(neededSignatures),
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleAddSigners = () => {
    setWallets([...wallets, ""]);
  };

  const handleUpdateSigner = (index: number, value: string) => {
    if (!value) {
      const newWallets = [...wallets];
      newWallets.splice(index, 1);
      setWallets(newWallets);
      return;
    }

    const newWallets = [...wallets];
    newWallets[index] = value;
    setWallets(newWallets);
  };

  useEffect(() => {
    if (!wallet.connected && !wallet.connecting) {
      dispatch(logout());
    }
  }, [wallet]);

  return (
    <Container>
      <Content>
        <Typography variant="h4" fontWeight="bold">
          Create Company
        </Typography>
        <ContentWrapper>
        <TextField
            label="Your name"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            label="Company name"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="count-label">Signatures to approve</InputLabel>
            <Select
              value={String(neededSignatures) as ""}
              onChange={(e) => setNeededSignatures(e.target.value as "")}
              labelId="count-label"
              label="Signatures to approve"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Signer 1"
            fullWidth
            value={wallet.publicKey?.toBase58()!}
            disabled
            required
          />
          {wallets.map((wallet, index) => (
            <TextField
              key={index}
              label={`Signer ${index + 2}`}
              fullWidth
              value={wallet}
              onChange={(e) => handleUpdateSigner(index, e.target.value)}
              required
            />
          ))}
          <Button
            onClick={() => handleAddSigners()}
            variant="contained"
            fullWidth
          >
            <Typography color="#fff">Add signer</Typography>
          </Button>
          <Button
            onClick={() => handleCreateCompany()}
            variant="contained"
            fullWidth
            disabled={loading || !isValid}
          >
            <Typography color="#fff">Confirm</Typography>
          </Button>
        </ContentWrapper>
      </Content>
    </Container>
  );
};
