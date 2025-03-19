import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Material } from "./Material";
import { Product } from "./Product";
import { ViewCart } from "./ViewCart";

@Index("material_fk", ["materialId"], {})
@Index("product_fk", ["productId"], {})
@Entity("product_material_mapping", { schema: "jwellery" })
export class ProductMaterialMapping {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("int", { name: "material_id" })
  materialId: number;

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

  @ManyToOne(() => Material, (material) => material.productMaterialMappings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "material_id", referencedColumnName: "id" }])
  material: Material;

  @ManyToOne(() => Product, (product) => product.productMaterialMappings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @OneToMany(() => ViewCart, (viewCart) => viewCart.productMaterial)
  viewCarts: ViewCart[];
}
