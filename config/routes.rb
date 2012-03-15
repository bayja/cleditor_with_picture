CleditorWithPicture::Engine.routes.draw do
  resources :editor_pictures, :only => [:create, :destroy]

end
