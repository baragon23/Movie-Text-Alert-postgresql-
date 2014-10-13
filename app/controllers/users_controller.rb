class UsersController < ApplicationController
  before_action :check_user_logged_in, only: [:edit, :update, :destroy]
  before_action :set_user, only: [:edit, :update, :destroy]

  def index
    if !current_user 
      redirect_to root_path
    else
      @users = User.all
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
  end

  private
    def check_user_logged_in
      if !current_user
        redirect_to root_path
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :phone)
    end
end
