<!DOCTYPE html>
<html>
   
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <body className="container mt-5">
        <div className="row">
            <div className="col-md-12">
            </div>
            <div className="col-md-12 mb-5">
                <p>ATTENTION: You will see a Charge on Your Credit Card Billing Statement from EVENT ESSENTIALS, the OFFICIAL TICKETING COMPANY for HOLLYWOOD FIGHT NIGHT and 360 PROMOTIONS. NO REFUNDS.</p>
            <p>Dear CALLUM WALSH,</p>

            <p>We appreciate your choice to join us at the Hollywood Fight Nights 2023. We look forward to seeing you there!</p>
            <p>Below is your order summary along with your actual ticket.</p>
               <div className="col-md-4 mt-5">
                      <table className="table">
                        <tr>
                            <th scope="row">Order Name:  </th>
                            <td>{{ $data['fullname'] }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Order Date: </th>
                        </tr>
                </table>
            </div>
            </div>
            <div className="col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Area</th>
                            <th scope="col">Section</th>
                            <th scope="col">Row</th>
                            <th scope="col">Seat</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($data['cart'] as $seat)
                             <tr>
                            <td>{{$seat['cart_product_id']}}</td>
                            <td>{{$seat['cart_product_id'] === 'no seats'?'no seat':$seat['venue_area']}}</td>
                            <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_section']}}</td>
                            <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_row']}}</td>
                            <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_seat']}}</td>
                            <td>Mark</td>
                            <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['price_sale']}}</td>
                        </tr>
                    @endforeach
                      
                    </tbody>
                </table>
            </div>
             <div className="col-md-4 mt-5">
                      <table className="table">
                        <tr>
                            <th scope="row">SUB TOTAL: </th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">TICKET FEE: </th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">TRANSACTION FEE: </th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">GRAND TOTAL:</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">NO REFUNDS</th>
                            <td></td>
                        </tr>
                </table>
            </div>
        </div>

    </body>

    </html>