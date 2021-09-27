module ApplicationHelper 
    extend ActiveSupport::Concern

    class_methods do
        def normalize_timestamp(timestamp)
            timestamp = timestamp.strftime("%A, %B %d | %I:%M:%S %p")
        end
    end


end
