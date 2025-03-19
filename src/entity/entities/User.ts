import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ViewCart } from "./ViewCart";

@Index("uniqueKey", ["uniqueKey"], { unique: true })
@Entity("user", { schema: "jwellery" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("char", {
    name: "uniqueKey",
    unique: true,
    length: 36,
    default: () => "'uuid()'",
  })
  uniqueKey: string;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "email_id", length: 255 })
  emailId: string;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("timestamp", {
    name: "created_on",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;

  @Column("bigint", { name: "created_by" })
  createdBy: string;

  @Column("timestamp", { name: "updated_on", nullable: true })
  updatedOn: Date | null;

  @Column("bigint", { name: "updated_by", nullable: true })
  updatedBy: string | null;

  @Column("timestamp", { name: "deleted_on", nullable: true })
  deletedOn: Date | null;

  @Column("bigint", { name: "otp", nullable: true })
  otp: string | null;

  @Column("varchar", { name: "fcm_token", nullable: true, length: 255 })
  fcmToken: string | null;

  @OneToMany(() => ViewCart, (viewCart) => viewCart.user)
  viewCarts: ViewCart[];
}
