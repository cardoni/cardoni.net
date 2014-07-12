class Post < ActiveRecord::Base

  validates :title,
            presence: true,
            uniqueness: { case_sensitive: false }

end
