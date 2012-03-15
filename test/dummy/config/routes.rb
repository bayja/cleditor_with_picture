Rails.application.routes.draw do

  resources :posts

  mount CleditorWithPicture::Engine => "/cleditor_with_picture"
end
