class MainController < ApplicationController
  def index
  end

  def testenv
  	render '/testenv/index'
  end

  def tictactoe
  	render '/tictactoe/index'
  end

  def simpleclock
  	render '/simpleclock/index'
  end

  def profile
  	render '/profile/index'
  end

  def forms
    render '/forms/index'
  end

  def temperature
    render '/temperature/index'
  end

  def products
    render '/products/index'
  end

  def loginform
    render '/loginform/index'
  end

  def datetime
    render '/datetime/index'
  end
end
