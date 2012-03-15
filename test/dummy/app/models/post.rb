# encoding: utf-8
class Post < ActiveRecord::Base
  include CleditorWithPicture::AssociateWithEditorPicture
end
