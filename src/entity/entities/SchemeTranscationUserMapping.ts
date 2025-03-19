import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Monthly } from "./Monthly";
import { SchemeUserMapping } from "./SchemeUserMapping";

@Index("scheme_user_fk", ["schemeUserMappingId"], {})
@Index("month_fk", ["monthId"], {})
@Entity("scheme_transcation_user_mapping", { schema: "jwellery" })
export class SchemeTranscationUserMapping {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "scheme_user_mapping_id" })
  schemeUserMappingId: number;

  @Column("int", { name: "month_id" })
  monthId: number;

  @Column("varchar", { name: "transcation_amount", length: 255 })
  transcationAmount: string;

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
    () => Monthly,
    (monthly) => monthly.schemeTranscationUserMappings,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "month_id", referencedColumnName: "id" }])
  month: Monthly;

  @ManyToOne(
    () => SchemeUserMapping,
    (schemeUserMapping) => schemeUserMapping.schemeTranscationUserMappings,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "scheme_user_mapping_id", referencedColumnName: "id" }])
  schemeUserMapping: SchemeUserMapping;
}
