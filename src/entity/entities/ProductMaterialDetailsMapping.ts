import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ViewCart } from "./ViewCart";

@Entity("product_material_details_mapping", { schema: "jwellery" })
export class ProductMaterialDetailsMapping {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_material_id" })
  productMaterialId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("tinyint", {
    name: "stock",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  stock: boolean | null;

  @Column("varchar", { name: "size", length: 255 })
  size: string;

  @Column("varchar", { name: "descrption", nullable: true, length: 255 })
  descrption: string | null;

  @Column("varchar", { name: "metal", nullable: true, length: 255 })
  metal: string | null;

  @Column("varchar", { name: "purity", nullable: true, length: 255 })
  purity: string | null;

  @Column("bigint", { name: "stone_amount" })
  stoneAmount: number;

  @Column("bigint", { name: "making_changes_amount" })
  makingChangesAmount: number;

  @Column("float", { name: "gst_percentage", precision: 12 })
  gstPercentage: number;

  @Column("bigint", { name: "grand_total" })
  grandTotal: number;

  @Column("timestamp", {
    name: "created_on",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;

  @Column("bigint", { name: "created_by" })
  createdBy: number;

  @Column("timestamp", { name: "updated_on", nullable: true })
  updatedOn: Date | null;

  @Column("bigint", { name: "updated_by", nullable: true })
  updatedBy: string | null;

  @Column("timestamp", { name: "deleted_on", nullable: true })
  deletedOn: Date | null;

  @Column("bigint", { name: "product_amount" })
  productAmount: string;

  @Column("bigint", {
    name: "antic color",
    nullable: true,
    default: () => "'0'",
  })
  anticColor: number | null;

  @Column("longblob", { name: "image", nullable: true })
image: Buffer | null;

  @OneToMany(() => ViewCart, (viewCart) => viewCart.productMaterial)
  viewCarts: ViewCart[];
}
