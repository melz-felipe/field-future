import { User } from "@prisma/client";
import { prisma } from "./database";

export class UserService {
  user: User;

  constructor(user?: User) {
    this.user = user;
  }

  public async findById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Company: true,
      },
    });
  }

  public async findByWallet(wallet: string) {
    return await prisma.user.findUnique({
      where: {
        wallet,
      },
      include: {
        Company: true,
      },
    });
  }
}
