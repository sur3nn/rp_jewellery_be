import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SchemeTranscationUserMapping } from "./SchemeTranscationUserMapping";
import { GoldScheme } from "./GoldScheme";

@Index("gold_schme_fk", ["goldSchemeId"], {})
@Entity("scheme_user_mapping", { schema: "jwellery" })
export class SchemeUserMapping {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "gold_scheme_id" })
  goldSchemeId: number;

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

  @Column("json", { name: "payment_details", nullable: true })
  paymentDetails: object | null;

  @OneToMany(
    () => SchemeTranscationUserMapping,
    (schemeTranscationUserMapping) =>
      schemeTranscationUserMapping.schemeUserMapping
  )
  schemeTranscationUserMappings: SchemeTranscationUserMapping[];

  @ManyToOne(() => GoldScheme, (goldScheme) => goldScheme.schemeUserMappings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "gold_scheme_id", referencedColumnName: "id" }])
  goldScheme: GoldScheme;
}
