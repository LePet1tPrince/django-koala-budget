# from django.db.models import Sum, F, Exists
# import decimal


# def getActuals(Budget,Transaction,Account,mnth=None, yr=None):

#     if mnth is not None and yr is not None:
#         #filter for budgets that exist this month
#         budget = Budget.objects.filter(month__month=mnth, month__year=yr)
#         #filter transactions for selected month
#         month_transactions = Transaction.objects.filter(date__month=mnth, date__year=yr)
#     else:
#         budget = Budget.objects.all()
#         month_transactions = Transaction.objects.all()

#     #query list to return total debits and credits per category
#     act = Account.objects.filter(Exists(month_transactions)).annotate(
#     total_debit=Sum('debit__amount'),total_credit=Sum('credit__amount')
# )
#     for a in act:
#         act_tot = (decimal.Decimal(0.0) if a.total_debit is None else a.total_debit) - (decimal.Decimal(0.0) if a.total_credit is None else a.total_credit)
#         for b in budget:
#             if b.category.id == a.id:
#                 b.actual = act_tot
#             else:
#                 pass

#     return budget

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

# Example usage:
# start_date = '2023-01-01'
# end_date = '2023-01-05'

# result = generate_date_range(start_date, end_date)
# print(result)