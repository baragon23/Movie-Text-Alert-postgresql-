class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :poster, :release_date
end