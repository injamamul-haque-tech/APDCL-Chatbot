from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': '6th_sem_internship_apdcl',
}


@app.route('/users', methods=['GET'])
def get_users():
    try:
        button = request.args.get('button')
        consumer_number = request.args.get('consumer_number')

        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        if button == "get_consumer_number":
            query = "select name,mobile_number,address,user_connection_type,user.meter_number,electric_connection.connected_load from user INNER JOIN electric_connection on user.meter_number = electric_connection.meter_number where consumer_number =" + consumer_number + ";"

        elif button == 'get_prepaid_balance':
            query = "select amount_paid,due_amount from bills where bill_date = (SELECT bill_date FROM bills WHERE consumer_number =" + consumer_number + " ORDER BY bill_date DESC LIMIT 1);"

            admin_query = "UPDATE admin SET recharge_btn = recharge_btn + 1 WHERE consumer_number ="+ consumer_number+";"
            cursor.execute(admin_query)
            connection.commit()

        elif button == 'get_last_bill_details':
            query = "select bill_number,bill_date,amount_paid,due_amount,due_date,transaction_mode from bills where bill_date = (SELECT bill_date FROM bills WHERE consumer_number = " + consumer_number + " ORDER BY bill_date DESC LIMIT 1);"

            admin_query = "UPDATE admin SET postpaid_bill_btn = postpaid_bill_btn + 1 WHERE consumer_number ="+ consumer_number+";"
            cursor.execute(admin_query)
            connection.commit()
        
        elif button == 'get_last_recharge_details':
            query = "select bill_number,bill_date,amount_paid,due_amount,due_date,transaction_mode from bills where bill_date = (SELECT bill_date FROM bills WHERE consumer_number = " + consumer_number + " ORDER BY bill_date DESC LIMIT 1);"

            admin_query = "UPDATE admin SET prepaid_bill_btn = prepaid_bill_btn + 1 WHERE consumer_number ="+ consumer_number+";"
            cursor.execute(admin_query)
            connection.commit()

        elif button == "update_mobile_number":
            mobile_number = request.args.get('mobile_number')
            update_query = "update user set mobile_number='" + mobile_number + "' where consumer_number = " + consumer_number + ";"
            cursor.execute(update_query)
            connection.commit()

            admin_query = "UPDATE admin SET update_mobile_number_btn = update_mobile_number_btn + 1 WHERE consumer_number ="+ consumer_number+";"
            cursor.execute(admin_query)
            connection.commit()

            query = "select name,mobile_number from user where consumer_number = " + consumer_number + ";"

        elif button == 'get_tips':
            tip_id = request.args.get('tip_id')
            query = "select tip_details from tips where tip_number = " + tip_id + ";"

            admin_query = "UPDATE admin SET tips_btn = tips_btn + 1 WHERE consumer_number ="+ consumer_number+";"
            cursor.execute(admin_query)
            connection.commit()

        elif button == 'lodge_complaint':
            complaint = request.args.get('complaint')
            date = request.args.get('date')
            complaint_query = "insert into complaints(consumer_number,complaint_details,complaint_date) values('" + consumer_number + "','" + complaint + "','"+date+"');"
            cursor.execute(complaint_query)
            connection.commit()

            query = "select complaint_number from complaints where consumer_number = "+consumer_number+" order by complaint_date DESC limit 1; "

            admin_query = "UPDATE admin SET lodge_complaint_btn = lodge_complaint_btn + 1 WHERE consumer_number ="+ consumer_number+";"
            cursor.execute(admin_query)
            connection.commit()

        elif button == 'graph':
            query = "SELECT user.consumer_number, name, address, mobile_number, user_connection_type, user.meter_number, electric_connection.connected_load, admin.recharge_btn, admin.prepaid_bill_btn, admin.postpaid_bill_btn, admin.tips_btn, admin.update_mobile_number_btn, admin.lodge_complaint_btn FROM user INNER JOIN electric_connection ON user.meter_number = electric_connection.meter_number INNER JOIN admin ON user.consumer_number = admin.consumer_number WHERE user.consumer_number = "+ consumer_number +";"

        else:
            return jsonify({'error': 'Invalid button parameter.', 'btn': button,
                            'consumer_num': consumer_number}), 400

        cursor.execute(query)

        rows = cursor.fetchall()
        if(len(rows) == 0):
            user = None
            user = {
                'msg': 'error'
            }
        else:
            for row in rows:
                if button == "get_consumer_number":
                    user = None
                    user = {
                        'name': row[0],
                        'mobile_number': row[1],
                        'address': row[2],
                        'user_connection_type': row[3],
                        'meter_number': row[4],
                        'connected_load': row[5],
                        'msg': 'success'
                    }

                elif button == 'get_prepaid_balance':
                    user = None
                    user = {
                        'amount_paid': row[0],
                        'due_amount': row[1],
                        'msg': 'success'
                    }

                elif button == 'get_last_bill_details':
                    user = None
                    user = {
                        'bill_number': row[0],
                        'bill_date': row[1],
                        'amount_paid': row[2],
                        'due_amount': row[3],
                        'due_date': row[4],
                        'transaction_mode': row[5],
                        'msg': 'success'
                    }

                elif button == 'get_last_recharge_details':
                    user = None
                    user = {
                        'bill_number': row[0],
                        'bill_date': row[1],
                        'amount_paid': row[2],
                        'due_amount': row[3],
                        'due_date': row[4],
                        'transaction_mode': row[5],
                        'msg': 'success'
                    }

                elif button == 'update_mobile_number':
                    user = None
                    user = {
                        'name' : row[0],
                        'mobile_number' : row[1],
                        'msg': 'success'
                    }

                elif button == 'get_tips':
                    user = None
                    user = {
                        'tip_details': row[0],
                        'msg': 'success'
                    }
                elif button == 'lodge_complaint':
                    connection.commit()
                    user = None
                    user = {
                        'complaint_number' : row[0],
                        'msg': 'success'
                    }
                elif button == 'graph':
                    user = None
                    user = {
                        'consumer_number':row[0],
                        'name':row[1],
                        'address':row[2],
                        'mobile_number':row[3] ,
                        'user_connection_type':row[4],
                        'meter_number':row[5],
                        'connected_load':row[6],
                        'recharge_btn':row[7],
                        'prepaid_bill_btn':row[8],
                        'postpaid_bill_btn':row[9],
                        'tips_btn':row[10],
                        'update_mobile_number_btn':row[11],
                        'lodge_complaint_btn':row[12],
                        'msg': 'success'
                    }


        cursor.close()
        connection.close()

        return jsonify(user)

    except Exception as e:
        return jsonify(
            {'error': 'An error occurred while fetching data: ' + str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
