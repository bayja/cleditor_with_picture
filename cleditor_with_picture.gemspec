$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "cleditor_with_picture/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "cleditor_with_picture"
  s.version     = CleditorWithPicture::VERSION
  s.authors     = ["KunHa"]
  s.email       = ["potato9@gmail.com"]
  s.homepage    = "none"
  s.summary     = "rails 3 engin with cleditor insert image plugin"
  s.description = "rails 3 engin with cleditor insert image plugin"

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.2"
  s.add_dependency "carrierwave"
  s.add_dependency "mini_magick"
  
  # s.add_dependency "jquery-rails"

  s.add_development_dependency "sqlite3"
end
