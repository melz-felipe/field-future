import { prisma } from "@/services/database";
import bs58 from "bs58";
import nacl from "tweetnacl";
import jwt from "jsonwebtoken";
import { UserService } from "./user";
import keys from "@/config/keys";
import { User } from "@prisma/client";

export class AuthService {
  public async authenticate(wallet: string, signature: string) {
    const currentKey = await prisma.walletAuthKey.findFirst({
      where: {
        wallet,
      },
    });

    const msg = `${currentKey?.authKey}:Sign this message to sign in to the app.`;
    const signatureUint8 = bs58.decode(signature);
    const msgUint8 = new TextEncoder().encode(msg);
    const pubKeyUint8 = bs58.decode(wallet);

    const validConnection = nacl.sign.detached.verify(
      msgUint8,
      signatureUint8,
      pubKeyUint8
    );

    if (!validConnection) {
      throw new Error("Invalid signature.");
    }

    const userService = new UserService();

    let user: User = await userService.findByWallet(wallet);

    if (!user) {
      user = await prisma.user.create({
        data: {
          wallet,
        },
      });
    }

    const token = jwt.sign(
      {
        wallet,
      },
      keys.jwtSecret,
      {
        expiresIn: "365d",
      }
    );

    return {
      status: true,
      token,
      user,
    };
  }

  public async requestLoginKey(wallet: string) {
    await prisma.walletAuthKey.deleteMany({
      where: {
        wallet,
      },
    });

    const key = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.walletAuthKey.create({
      data: {
        wallet,
        authKey: key,
      },
    });

    return {
      key,
    };
  }
}
