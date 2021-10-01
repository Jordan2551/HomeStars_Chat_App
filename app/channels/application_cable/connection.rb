module ApplicationCable
    class Connection < ActionCable::Connection::Base
        identified_by :current_user

        def connect
            self.current_user = current_user
        end

        def disconnect
            ActionCable.server.remote_connections.where(current_user: :current_user).disconnect()
        end
    end
end