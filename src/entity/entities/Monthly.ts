import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchemeTranscationUserMapping } from "./SchemeTranscationUserMapping";

@Entity("monthly", { schema: "jwellery" })
export class Monthly {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

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

  @OneToMany(
    () => SchemeTranscationUserMapping,
    (schemeTranscationUserMapping) => schemeTranscationUserMapping.month
  )
  schemeTranscationUserMappings: SchemeTranscationUserMapping[];
}
