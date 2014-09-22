class User < ActiveRecord::Base
	has_many :selections
	has_many :movies, through: :selection

	has_secure_password
end
