from replit import db

def add_keys_to_database(private_key, public_key):
	db[private_key] = public_key

def find_public_key_from_private_key(private_key):
	print(db[private_key])

def add(num1, num2):
	num3 = num1 + num2
	print(num3)
