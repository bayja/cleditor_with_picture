class CreateCleditorWithPictureEditorPictures < ActiveRecord::Migration
  def change
    create_table :cleditor_with_picture_editor_pictures do |t|
      t.string    :image
      t.string    :imageable_id
      t.string    :imageable_type
      
      t.timestamps
    end
  end
end
