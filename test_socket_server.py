import socket

HOST = 'masintolge.cs.ut.ee'    # The remote host
PORT = 80           # The same port as used by the server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))
s.sendall('Take away|||en|||et')
data = s.recv(1024).decode("utf-8")
s.close()
print(data)

