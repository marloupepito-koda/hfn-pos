<!DOCTYPE html>
<html>
   
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <body class="container mt-5">
       <div class="m-5">
        <div class="row">
            <div class="col-md-12">
            </div>
            <div class="col-md-12 mb-5">
                <p>ATTENTION: You will see a Charge on Your Credit Card Billing Statement from EVENT ESSENTIALS, the OFFICIAL TICKETING COMPANY for HOLLYWOOD FIGHT NIGHT and 360 PROMOTIONS. NO REFUNDS.</p>
            <p>Dear CALLUM WALSH,</p>

            <p>We appreciate your choice to join us at the Hollywood Fight Nights 2023. We look forward to seeing you there!</p>
            <p>Below is your order summary along with your actual ticket.</p>
               <div class="col-md-4 mt-5">
                      <table class="table">
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
            <div class="col-md-12">
                  <a  target="_blank" href=<?php echo 'https://hfn-pos.ee4.co/tickets/pdf/'.session('tokens') ?>><?php echo 'https://hfn-pos.ee4.co/tickets/pdf/'.session('tokens') ?></a>
            </div>
            <div class="col-md-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
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
                            <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_row']}}</td>
                            <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_seat']}}</td>
                            <td>Mark</td>
                            <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['price_sale']}}</td>
                        </tr>
                    @endforeach
                      
                    </tbody>
                </table>
            </div>
             <div class="col-md-4 mt-5">
                      <table class="table">
                        <tr>
                            <th scope="row">SUB TOTAL: </th>
                            <td>$ {{$data['subTotal']}}</td>
                        </tr>
                        <tr>
                            <th scope="row">TICKET FEE: </th>
                            <td>$ {{$data['ticketFee']}}</td>
                        </tr>
                        <tr>
                            <th scope="row">TRANSACTION FEE: </th>
                            <td>$ 0.00</td>
                        </tr>
                        <tr>
                            <th scope="row">GRAND TOTAL:</th>
                            <td>$ {{$data['grandTotal']}}</td>
                        </tr>
                        <tr>
                            <th scope="row">NO REFUNDS</th>
                            <td></td>
                        </tr>
                </table>
            </div>
            <div class="col-md-12 mt-3">
                <p>TICKET PURCHASER INFORMATION</p>
                <p>CALLUM WALSH</p>
                <p>mike@360promotions.us</p>
                <p>(805) 910-6111</p>
             <div>
              <div class="col-md-12 mt-3">
                <p>BILLING INFORMATION</p>
                <p>360 PROMOTIONS</p>
                <p>O, CA, 93010</p>
             <div>
               <div class="col-md-12 mt-3">
                <p>EVENT INFORMATION</p>
                <p>Date: Friday, June 9th, 2023</p>
                <p>Hours: Doors open at 5:30 PM</p>
                <p>Location: Commerce Casino, 6131 Telegraph Rd, Commerce, CA 90040</p>
                <p>Directions: https://goo.gl/maps/9uj5tpGJM8MTWQR88</p>
                <p>O, CA, 93010</p>
             <div>

              <div class="col-md-12 mt-3">
                <p>Get more information at http://360promotions.us</p>
             <div>
                  <div class="col-md-12 mt-3">
                <p>If you have questions and/or comments, please contact us at orders@event-essentials.net</p>
             <div>
        </div>
</div>

    </body>

    </html>