using ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs
{
    public class ChatHub(SharedDb sharedDb) : Hub
    {
        private readonly SharedDb _sharedDb = sharedDb;

        public async Task JoinChat(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
            await Clients.All.SendAsync("ReceiveMessage", $"{userConnection.Username} has joined {userConnection.ChatRoom}");
        }

        public async Task JoinSpecificChatRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(connectionId: Context.ConnectionId, groupName: userConnection.ChatRoom);

            _sharedDb.connection[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveMessage", $"{userConnection.Username} has joined {userConnection.ChatRoom}");
        }

        public async Task SendMessage(string message)
        {
            if (_sharedDb.connection.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveSpecificMessage", message);
            }


        }
    }
}
