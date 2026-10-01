import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."hero_pair_video_pos" AS ENUM('right', 'left');
  CREATE TABLE "pages_blocks_hero_media_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"video_position" "hero_pair_video_pos" DEFAULT 'right',
  	"tagline" varchar,
  	"tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_media_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"video_position" "hero_pair_video_pos" DEFAULT 'right',
  	"tagline" varchar,
  	"tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "local_landing_pages_blocks_hero_media_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"video_position" "hero_pair_video_pos" DEFAULT 'right',
  	"tagline" varchar,
  	"tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_local_landing_pages_v_blocks_hero_media_pair" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"video_position" "hero_pair_video_pos" DEFAULT 'right',
  	"tagline" varchar,
  	"tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_media_pair" ADD CONSTRAINT "pages_blocks_hero_media_pair_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_media_pair" ADD CONSTRAINT "pages_blocks_hero_media_pair_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_media_pair" ADD CONSTRAINT "pages_blocks_hero_media_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_media_pair" ADD CONSTRAINT "_pages_v_blocks_hero_media_pair_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_media_pair" ADD CONSTRAINT "_pages_v_blocks_hero_media_pair_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_media_pair" ADD CONSTRAINT "_pages_v_blocks_hero_media_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_hero_media_pair" ADD CONSTRAINT "local_landing_pages_blocks_hero_media_pair_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_hero_media_pair" ADD CONSTRAINT "local_landing_pages_blocks_hero_media_pair_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "local_landing_pages_blocks_hero_media_pair" ADD CONSTRAINT "local_landing_pages_blocks_hero_media_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."local_landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_media_pair" ADD CONSTRAINT "_local_landing_pages_v_blocks_hero_media_pair_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_media_pair" ADD CONSTRAINT "_local_landing_pages_v_blocks_hero_media_pair_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_local_landing_pages_v_blocks_hero_media_pair" ADD CONSTRAINT "_local_landing_pages_v_blocks_hero_media_pair_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_local_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_media_pair_order_idx" ON "pages_blocks_hero_media_pair" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_media_pair_parent_id_idx" ON "pages_blocks_hero_media_pair" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_media_pair_path_idx" ON "pages_blocks_hero_media_pair" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_pair_image_idx" ON "pages_blocks_hero_media_pair" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_media_pair_video_idx" ON "pages_blocks_hero_media_pair" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_hero_media_pair_order_idx" ON "_pages_v_blocks_hero_media_pair" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_media_pair_parent_id_idx" ON "_pages_v_blocks_hero_media_pair" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_media_pair_path_idx" ON "_pages_v_blocks_hero_media_pair" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_pair_image_idx" ON "_pages_v_blocks_hero_media_pair" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_media_pair_video_idx" ON "_pages_v_blocks_hero_media_pair" USING btree ("video_id");
  CREATE INDEX "local_landing_pages_blocks_hero_media_pair_order_idx" ON "local_landing_pages_blocks_hero_media_pair" USING btree ("_order");
  CREATE INDEX "local_landing_pages_blocks_hero_media_pair_parent_id_idx" ON "local_landing_pages_blocks_hero_media_pair" USING btree ("_parent_id");
  CREATE INDEX "local_landing_pages_blocks_hero_media_pair_path_idx" ON "local_landing_pages_blocks_hero_media_pair" USING btree ("_path");
  CREATE INDEX "local_landing_pages_blocks_hero_media_pair_image_idx" ON "local_landing_pages_blocks_hero_media_pair" USING btree ("image_id");
  CREATE INDEX "local_landing_pages_blocks_hero_media_pair_video_idx" ON "local_landing_pages_blocks_hero_media_pair" USING btree ("video_id");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_media_pair_order_idx" ON "_local_landing_pages_v_blocks_hero_media_pair" USING btree ("_order");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_media_pair_parent_id_idx" ON "_local_landing_pages_v_blocks_hero_media_pair" USING btree ("_parent_id");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_media_pair_path_idx" ON "_local_landing_pages_v_blocks_hero_media_pair" USING btree ("_path");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_media_pair_image_idx" ON "_local_landing_pages_v_blocks_hero_media_pair" USING btree ("image_id");
  CREATE INDEX "_local_landing_pages_v_blocks_hero_media_pair_video_idx" ON "_local_landing_pages_v_blocks_hero_media_pair" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_media_pair" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_media_pair" CASCADE;
  DROP TABLE "local_landing_pages_blocks_hero_media_pair" CASCADE;
  DROP TABLE "_local_landing_pages_v_blocks_hero_media_pair" CASCADE;
  DROP TYPE "public"."hero_pair_video_pos";`)
}
