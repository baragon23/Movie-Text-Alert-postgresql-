# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140923010230) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "movies", force: true do |t|
    t.string   "title"
    t.string   "poster"
    t.string   "release_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "selections", force: true do |t|
    t.integer  "users_id"
    t.integer  "movies_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "selections", ["movies_id"], name: "index_selections_on_movies_id", using: :btree
  add_index "selections", ["users_id"], name: "index_selections_on_users_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
