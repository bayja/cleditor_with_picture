require "cleditor_with_picture/engine"

module CleditorWithPicture
  module AssociateWithEditorPicture
    def self.included(base)
      base.send(:has_many, :editor_pictures, {:as => :imageable, :dependent => :destroy, :class_name => 'CleditorWithPicture::EditorPicture'})
      base.send(:attr_accessor, :child_picture_ids)
      base.send(:after_save, :update_associated_pictures)
    end
    
    def update_associated_pictures
      if self.child_picture_ids.present?
        EditorPicture.where(:id => self.child_picture_ids).each do |picture|
          picture.update_attributes(:imageable_type => self.class.to_s, :imageable_id => self.id)
        end
      end
    end
  end
end
