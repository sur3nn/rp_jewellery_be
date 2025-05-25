import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductMaterialDetailsMapping } from "./ProductMaterialDetailsMapping";
import { User } from "./User";

@Index("view_user_fk", ["userId"], {})
@Index("product_material_fk", ["productMaterialId"], {})
@Entity("view_cart", { schema: "jwellery" })
export class ViewCart {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "product_material_id" })
  productMaterialId: number;

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

  @Column("int", { name: "quantity", nullable: true })
quantity: number | null;

  @ManyToOne(
    () => ProductMaterialDetailsMapping,
    (productMaterialDetailsMapping) => productMaterialDetailsMapping.viewCarts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "product_material_id", referencedColumnName: "id" }])
  productMaterial: ProductMaterialDetailsMapping;

  @ManyToOne(() => User, (user) => user.viewCarts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
