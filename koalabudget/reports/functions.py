from datetime import timedelta, date

def generate_date_range(start_date, end_date):
    # Convert input strings to date objects
    start_date = date(*map(int, start_date.split('-')))
    end_date = date(*map(int, end_date.split('-')))
    
    # Calculate the difference between end_date and start_date
    delta = timedelta(days=1)

    # Generate the list of dates
    date_list = []
    current_date = start_date

    while current_date <= end_date:
        date_list.append(current_date.strftime('%Y-%m-%d'))
        current_date += delta

    return date_list