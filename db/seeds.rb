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

Item.create({name: "Titanic", category: movies})
Item.create({name: "The Big Lebowski", category: movies})
Item.create({name: "Gino's Pizza", category: restaurants})
Item.create({name: "McDonald's", category: restaurants})
Item.create({name: "The Office", category: tv_shows})
Item.create({name: "Pardon the Interruption", category: tv_shows})
Item.create({name: "Skiing", category: activities})
Item.create({name: "Hiking", category: activities})

puts "Done seeding! That will be $8,000"