require 'spec_helper'

describe Post do
  before do
    @post = Post.new(title: "Greg Cardoni")
  end

  subject { @post }

  it { should respond_to(:title) }
  it { should be_valid }

  describe "when title is not present" do
    before { @post.title = " " }
    it { should_not be_valid }
  end

  describe "when title is duplicate" do
    before do
      post_with_same_title = @post.dup
      post_with_same_title.title = @post.title.upcase
      post_with_same_title.save
    end

    it { should_not be_valid }
  end
end
