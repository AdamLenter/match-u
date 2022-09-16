# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Seeding!"

movies = Category.create({name: "Movies"})
restaurants = Category.create({name: "Restaurants"})
tv_shows = Category.create({name: "TV Shows"})
activities = Category.create({name: "Activities"})
sports_teams = Category.create({name: "Sports Teams"})

i = 0;

while i < 50 do
    Item.create({name: Faker::Movie.title, category: movies})
    Item.create({name: Faker::Restaurant.name, category: restaurants})
    Item.create({name: Faker::Hobby.activity, category: activities})

    i = i + 1
end

i = 0

while i < 25 do 
    Item.create({name: Faker::Sports::Basketball.team, category: sports_teams})
    Item.create({name: Faker::Sports::Football.team, category: sports_teams})
    i = i + 1
end

puts "Done seeding! That will be $8,000"