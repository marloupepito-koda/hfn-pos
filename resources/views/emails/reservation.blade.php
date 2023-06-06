<!DOCTYPE html>
<html>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <body class="container mt-5">
        <div class="m-5">
            <div class="row">
                <div class="col-md-12 mb-5">
                    <p>ATTENTION: You will see a Charge on Your Credit Card Billing Statement from EVENT ESSENTIALS, the OFFICIAL TICKETING COMPANY for HOLLYWOOD FIGHT NIGHT and 360 PROMOTIONS. NO REFUNDS.</p>
                    
                    <p>
                        Dear CALLUM WALSH, <br /><br />
                        We appreciate your choice to join us at the Hollywood Fight Nights 2023. We look forward to seeing you there!<br /><br />
                        Below is your order summary along with your actual ticket.
                    </p>
                    <p>
                        <strong>Order Name:</strong> <span>{{ $data['fullname'] }}</span><br />
                        <strong>Order Date:</strong> <span></span><br />
                        <strong>Ticket Link:</strong> <a target="_blank" href=<?php echo 'https://hfn-pos.ee4.co/tickets/pdf/'.session('tokens') ?>><?php echo 'https://hfn-pos.ee4.co/tickets/pdf/'.session('tokens') ?></a>
                    </p>
                </div>

                <div class="col-md-12">
                    <table class="table" style="min-width: 720px;">
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
                                <tr style="text-align: center;">
                                    <td>{{$seat['cart_product_id']}}</td>
                                    <td>{{$seat['cart_product_id'] === 'no seats'?'no seat':$seat['venue_area']}}</td>
                                    <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_section']}}</td>
                                    <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_row']}}</td>
                                    <td>{{$seat['cart_product_id'] === 'no seats'?'':$seat['venue_seat']}}</td>
                                    <td>{{ $seat['cart_product_id'] === 'no seats' ? '' : $seat['quantity'] }}</td>
                                    <td>{{ ($seat['cart_product_id'] === 'no seats' ? '' : '$' . $seat['price_sale']) }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="col-md-4 mt-5">
                    <strong>Sub Total:</strong> <span>${{$data['subTotal']}}</span><br />
                    <strong>Ticket Fee:</strong> <span>${{$data['ticketFee']}}</span><br />
                    <strong>Transaction Fee:</strong> <span>$0.00</span><br />
                    <strong>Grand Total:</strong> <span>${{$data['grandTotal']}}</span><br />
                    <strong>NO REFUNDS</strong>
                </div>

                <div class="col-md-12 mt-3">
                    <p>
                        <strong>TICKET PURCHASER INFORMATION</strong><br />
                        CALLUM WALSH<br />
                        mike@360promotions.us<br />
                        (805) 910-6111
                    </p>
                
                    <p>
                        <strong>BILLING INFORMATION</strong><br />
                        360 PROMOTIONS<br />
                        O, CA, 93010
                    </p>
                    
                    <p>
                        <strong>EVENT INFORMATION</strong><br />
                        Date: Friday, June 9th, 2023<br />
                        Hours: Doors open at 5:30 PM<br />
                        Location: Commerce Casino, 6131 Telegraph Rd, Commerce, CA 90040<br />
                        Directions: https://goo.gl/maps/9uj5tpGJM8MTWQR88<br />
                        O, CA, 93010
                    </p>

                    <p>Get more information at http://360promotions.us</p>
                
                    <p>If you have questions and/or comments, please contact us at orders@event-essentials.net</p>
                <div>
            </div>
        </div>
    </body>
</html>