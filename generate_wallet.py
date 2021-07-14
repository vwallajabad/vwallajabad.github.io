##Stuff to fix
#1. Instead of putting number use a professional hashing one
#2. Use a database to make sure no public keys or private keys repeat
#3. Find people to test these and try to find bugs, security loops
def Generate_Keys():
	import random
	import hashlib 
	number = 10000000000
	list = []

	for i in range(1):
				address = random.randint(1, number)

				if address not in list: list.append(address)

	public_str = str(address)
	hash_form = hashlib.md5()

	encoded_string = public_str.encode()

	hash_form.update(encoded_string)

	##
	private_str = str(address)
	hash_form_private = hashlib.sha512()

	encoded_string_private = private_str.encode()

	hash_form_private.update(encoded_string_private)



	Public_Address = hash_form.hexdigest()

	Private_Address = hash_form_private.hexdigest()

	print('Public Address:',Public_Address)

	print('Private Address:', Private_Address)