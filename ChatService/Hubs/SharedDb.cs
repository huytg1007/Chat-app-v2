
using System.Collections.Concurrent;
using ChatService.Models;

namespace ChatService.Hubs
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _userConnections = new ConcurrentDictionary<string, UserConnection>();
        public ConcurrentDictionary<string, UserConnection> connection => _userConnections;

    }
}