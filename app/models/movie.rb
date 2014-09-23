class Movie < ActiveRecord::Base
	has_many :selections
	has_many :users, through: :selection

	def get_notifications
		Movie.find_by_sql("SELECT u.phone, m.title, m.release_date FROM users AS u INNER JOIN movies AS m ON u.id = m.user_id WHERE m.release_date::date = current_date")

		# 	Query returns in format:
		#		  phone   |      title       | release_date
		#		----------+------------------+--------------
		# 		 34534534 | April Apocalypse | 2014-09-23

	end
end
