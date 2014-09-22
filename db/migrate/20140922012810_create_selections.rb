class CreateSelections < ActiveRecord::Migration
  def change
    create_table :selections do |t|
    	t.references :users, index: true
    	t.references :movies, index: true
    	t.timestamps
    end
  end
end
