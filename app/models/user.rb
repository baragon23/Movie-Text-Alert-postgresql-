require 'twilio-ruby'

class User < ActiveRecord::Base
	has_many :selections
	has_many :movies, through: :selection

	has_secure_password

	def self.get_notifications
		Movie.find_by_sql("SELECT u.phone, m.title FROM users AS u INNER JOIN movies AS m ON u.id = m.user_id WHERE m.release_date::date = current_date")

		# 	Query returns in format:
		#		  phone   |      title       | release_date
		#		----------+------------------+--------------
		# 		 34534534 | April Apocalypse | 2014-09-23
	end

	def self.twilio_api_call
		# get user data to parse and send to Twilio api
		data = get_notifications
		# put your own credentials here 
		account_sid = 'ACeb73dd5d54980977681dafd727d7d2f3' 
		auth_token = '854e2526968124dda6dc87d85f9fab52'


		# data is array of hashes. Parse data.
		# loop through data hash, build Twilio code
		data.each { | key |
			phone_number = key["phone"]
			message = "Message from MovieTextAlert.com - the movie: '" + key["title"] + "' has been released today in theaters."
		
			# set up a client to talk to the Twilio REST API 
			@client = Twilio::REST::Client.new account_sid, auth_token 
			 
			@client.account.messages.create({
				:from => '+18563176098', 
				:to => phone_number, 
				:body => message,
			})
		}

	end
end
