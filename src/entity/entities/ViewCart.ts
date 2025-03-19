import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductMaterialMapping } from "./ProductMaterialMapping";
import { User } from "./User";

@Index("product_material_fk", ["productMaterialId"], {})
@Index("view_user_fk", ["userId"], {})
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

  @ManyToOne(
    () => ProductMaterialMapping,
    (productMaterialMapping) => productMaterialMapping.viewCarts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "product_material_id", referencedColumnName: "id" }])
  productMaterial: ProductMaterialMapping;

  @ManyToOne(() => User, (user) => user.viewCarts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
