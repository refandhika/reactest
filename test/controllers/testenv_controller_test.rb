require 'test_helper'

class TestenvControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get testenv_index_url
    assert_response :success
  end

end
