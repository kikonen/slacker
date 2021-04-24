# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_23_215751) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_members", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
    t.uuid "channel_id", null: false
    t.uuid "user_id", null: false
    t.index ["channel_id", "user_id"], name: "idx_members", unique: true
    t.index ["channel_id"], name: "idx_member_channel"
    t.index ["user_id"], name: "idx_member_user"
  end

  create_table "channel_states", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "offset", null: false
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
    t.uuid "user_id", null: false
    t.index ["user_id"], name: "idx_user_channel_state"
  end

  create_table "channels", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.boolean "private", default: false, null: false
    t.boolean "automatic", default: false, null: false
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
  end

  create_table "events", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "type", null: false
    t.string "content", null: false
    t.boolean "deleted", default: false, null: false
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
    t.uuid "channel_id", null: false
    t.uuid "user_id", null: false
    t.uuid "target_event_id"
    t.index ["channel_id"], name: "idx_event_channel"
    t.index ["target_event_id"], name: "idx_event_target"
    t.index ["user_id"], name: "idx_event_user"
  end

  create_table "roles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
  end

  create_table "tokens", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "token", null: false
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
    t.uuid "user_id", null: false
    t.index ["token"], name: "index_tokens_on_token", unique: true
    t.index ["user_id"], name: "idx_token_user"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "email", null: false
    t.string "nick"
    t.string "status"
    t.datetime "created_at", default: -> { "now()" }, null: false
    t.datetime "updated_at", default: -> { "now()" }, null: false
    t.uuid "role_id"
    t.index ["email"], name: "idx_user_email", unique: true
    t.index ["role_id"], name: "idx_user_role"
  end

  add_foreign_key "channel_members", "channels"
  add_foreign_key "channel_members", "users"
  add_foreign_key "channel_states", "users"
  add_foreign_key "events", "channels"
  add_foreign_key "events", "events", column: "target_event_id"
  add_foreign_key "events", "users"
  add_foreign_key "tokens", "users"
  add_foreign_key "users", "roles"
  # no candidate create_trigger statement could be found, creating an adapter-specific one
  execute(<<-SQL)
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$function$
  SQL

  # no candidate create_trigger statement could be found, creating an adapter-specific one
  execute("CREATE TRIGGER set_updated_at BEFORE UPDATE ON \"users\" FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_updated_at()")

end
