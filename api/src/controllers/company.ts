import { Response, Request } from "express";
import Squads, {
  DEFAULT_MULTISIG_PROGRAM_ID,
  getAuthorityPDA,
} from "@sqds/sdk";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  Connection,
  PublicKey,
} from "@solana/web3.js";
import { Wallet } from "@sqds/sdk";
import BN from "bn.js";

import { logger } from "@/services/logger";
import { AuthService } from "@/services/auth";
import { LoginSchema, RequestLoginKeySchema } from "@/routes/schemas/auth";

export const airdrop = async (
  connection: Connection,
  address: PublicKey,
  amount: number
) => {
  const airdropSig = await connection.requestAirdrop(address, amount);
  console.log("Airdrop sig", airdropSig);
  await connection.confirmTransaction(airdropSig, "confirmed");

  return airdropSig;
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { companyName, wallets, neededSignatures } = req.body;

    const walletKeypair = new Keypair();

    const squads = Squads.devnet(new Wallet(walletKeypair));
    const createKey = new PublicKey(wallets[0]);
    const threshold = neededSignatures;
    const members = wallets.map((item: string) => new PublicKey(item));
    const name = companyName;
    const description = "Company.";

    const multisigAccount = await squads.createMultisig(
      threshold,
      createKey,
      members,
      name,
      description
    );

    console.log(
      "Successfully created a new multisig at",
      multisigAccount.publicKey.toBase58()
    );
    console.log("Multisig account:", JSON.stringify(multisigAccount));
    const [vault] = await getAuthorityPDA(
      multisigAccount.publicKey,
      new BN(1),
      DEFAULT_MULTISIG_PROGRAM_ID
    );
    console.log("Default Vault address:", vault.toBase58());

    return res.status(200).send();
  } catch (err) {
    console.log(err);
    logger.error(err);
    return res.status(500).send("Something went wrong.");
  }
};
