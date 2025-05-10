using ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user.ChatRoom);
            await Clients.All.SendAsync("ReceiveMessage", $"{user.Username} has joined {user.ChatRoom}");
        }

        public async Task JoinSpecificChatRoom(UserConnection user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user.ChatRoom);
            await Clients.Group(user.ChatRoom).SendAsync("ReceiveMessage", $"{user.Username} has joined {user.ChatRoom}");
        }
    }
}
