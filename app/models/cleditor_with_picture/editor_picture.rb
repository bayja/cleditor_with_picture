# encoding: utf-8

module CleditorWithPicture
  class EditorPicture < ActiveRecord::Base
    belongs_to :imageable, :polymorphic => true
    mount_uploader :image, EditorPictureUploader
  end
end
