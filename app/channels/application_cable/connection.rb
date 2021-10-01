module ApplicationCable
    class Connection < ActionCable::Connection::Base
        identified_by :current_user

        # TODO:: ??
        def connect
            self.current_user = User.last
        end

        def disconnect
            ActionCable.server.remote_connections.where(current_user: User.last).disconnect()
        end

        # private
        # def find_verified_user
        #   if verified_user = User.find_by(id: cookies.encrypted[:user_id])
        #     verified_user
        #   else
        #     reject_unauthorized_connection
        #   end
        # end
    end
end