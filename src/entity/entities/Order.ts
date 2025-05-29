import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order", { schema: "jwellery" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "order_status", length: 255 })
  orderStatus: string;

  @Column("int", { name: "user_id" })
  userId: number;

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

  @Column("json", {
    name: "product_details_mapping_id",
    nullable: true,
    default: () => "'json_array()'",
  })
  productDetailsMappingId: object | null;
}
