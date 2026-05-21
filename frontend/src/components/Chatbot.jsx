import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! 👋 Welcome to LankaGrocery. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userInput) => {
    const text = userInput.toLowerCase();

    if (
      text.includes('hi') || text.includes('hello') || text.includes('hey') || 
      text.includes('kohomada') || text.includes('good morning') || text.includes('good evening') ||
      text.includes('ayubowan')
    ) {
      return 'Hello there! 👋 Welcome to LankaGrocery. Are you looking for fresh vegetables, fruits, or groceries today?';
    } 
    
    else if (
      text.includes('delivery') || text.includes('shipping') || text.includes('gedarata') || 
      text.includes('deliver') || text.includes('transport') || text.includes('fee') ||
      text.includes('charge') || text.includes('how much to bring') || text.includes('courier')
    ) {
      return '🚚 We deliver island-wide in Sri Lanka! \n- FREE delivery for orders above Rs. 5000.\n- Standard delivery fee is Rs. 350 for orders below that.';
    } 
    
    else if (
      text.includes('pay') || text.includes('salli') || text.includes('card') || 
      text.includes('qr') || text.includes('cash') || text.includes('cod') ||
      text.includes('paypal') || text.includes('gewanne') || text.includes('gewanawa')
    ) {
      return '💳 We accept multiple payment methods:\n1. Cash on Delivery (COD)\n2. Visa/Mastercard (via PayPal)\n3. LankaQR (Scan & Pay)';
    } 
    
    else if (
      text.includes('time') || text.includes('open') || text.includes('hours') || 
      text.includes('close') || text.includes('welawa') || text.includes('dawasa')
    ) {
      return '🕒 You can place orders on our website 24/7! However, our delivery and customer support teams are active daily from 8:00 AM to 6:00 PM.';
    } 
    
    else if (
      text.includes('contact') || text.includes('number') || text.includes('call') || 
      text.includes('phone') || text.includes('email') || text.includes('katha') ||
      text.includes('whatsapp')
    ) {
      return '📞 You can easily reach us via:\nHotline: 011-2345678\nWhatsApp: 077-1234567\nEmail: support@lankagrocery.com';
    } 
    
    else if (
      text.includes('return') || text.includes('refund') || text.includes('maru') || 
      text.includes('damage') || text.includes('spoiled') || text.includes('narak') ||
      text.includes('exchange')
    ) {
      return '♻️ 100% Quality Guarantee! If any item is damaged or not fresh, please report it within 24 hours of delivery for a full refund or replacement.';
    }

    else if (
      text.includes('track') || text.includes('where is my order') || text.includes('status') || 
      text.includes('awada') || text.includes('delay') || text.includes('enawa')
    ) {
      return '📍 You can check your order status by clicking on your Profile name at the top right, and going to "My Orders".';
    }

    else if (
      text.includes('vegetable') || text.includes('fruit') || text.includes('elawalu') || 
      text.includes('pala') || text.includes('fresh') || text.includes('item')
    ) {
      return '🥕 We have a wide range of organic vegetables, fresh fruits, and daily groceries. Use the search bar at the top to find specific items!';
    }

    else if (
      text.includes('location') || text.includes('address') || text.includes('where') || 
      text.includes('shop eka') || text.includes('koheda') || text.includes('store')
    ) {
      return '🏪 We are primarily an online grocery store delivering directly from our warehouse in Colombo to your doorstep. We do not have a walk-in retail store.';
    }

    else if (
      text.includes('register') || text.includes('account') || text.includes('login') || 
      text.includes('sign') || text.includes('password')
    ) {
      return '👤 To place an order, you need an account. Click "Login" or "Register" at the top right of the page. It takes only 1 minute!';
    }

    else if (
      text.includes('discount') || text.includes('offer') || text.includes('promo') || 
      text.includes('adu') || text.includes('sale') || text.includes('coupon')
    ) {
      return '🎁 Check our homepage for the latest discounts! Also, delivery is absolutely FREE if your total order value exceeds Rs. 5000.';
    }

    else if (
      text.includes('bulk') || text.includes('wholesale') || text.includes('goda') || 
      text.includes('hotel') || text.includes('restaurant')
    ) {
      return '📦 For wholesale or bulk orders (for restaurants/hotels), please call our hotline at 011-2345678 for special discounted rates.';
    }

    else if (
      text.includes('thank') || text.includes('thanks') || text.includes('istuti') || 
      text.includes('ela') || text.includes('good')
    ) {
      return 'You are very welcome! 😊 Have a great day and happy shopping with LankaGrocery!';
    }

    else if (
      text.includes('how to buy') || text.includes('how to order') || text.includes('order karanne') || 
      text.includes('buy karanne') || text.includes('gannawa') || text.includes('step') || text.includes('purchase')
    ) {
      return '🛒 Ordering is easy!\n1. Add products to your Cart.\n2. Click the Cart icon and go to Checkout.\n3. Enter your address.\n4. Choose a payment method and click "Place Order".';
    }

    else if (
      text.includes('trust') || text.includes('sure') || text.includes('wiswasa') || 
      text.includes('scam') || text.includes('fake') || text.includes('boruwak') || text.includes('safe')
    ) {
      return '🛡️ You can 100% trust us! LankaGrocery is a registered business. We use secure PayPal and Bank-approved LankaQR payments. You can also choose Cash on Delivery (COD) to pay only after receiving the goods!';
    }

    else if (
      text.includes('price') || text.includes('mila') || text.includes('ganan') || 
      text.includes('expensive') || text.includes('cheap') || text.includes('laabai') || text.includes('cost')
    ) {
      return '🏷️ We offer the best market prices! Our products come directly from farmers and wholesale suppliers, ensuring you get fresh quality at affordable rates.';
    }

    else if (
      text.includes('when') || text.includes('how long') || text.includes('kiyawelawak') || 
      text.includes('kawadada') || text.includes('ada') || text.includes('today') || text.includes('tomorrow')
    ) {
      return '⏱️ Orders placed before 10:00 AM are usually delivered on the same day (in Colombo & Suburbs). Other orders are delivered within 24-48 hours.';
    }

    else if (
      text.includes('cancel') || text.includes('change') || text.includes('wenas') || 
      text.includes('remove') || text.includes('delete order')
    ) {
      return '✏️ If you need to cancel or change your order, please call us immediately at 011-2345678 before the order status changes to "Delivered".';
    }

    else if (
      text.includes('salli apathata') || text.includes('how to refund') || text.includes('money back') || 
      text.includes('return salli')
    ) {
      return '💸 Approved refunds for card payments will take 3-5 business days to reflect in your bank account. COD refunds are processed via bank transfer within 24 hours.';
    }

    else if (
      text.includes('missing') || text.includes('wrong') || text.includes('na') || 
      text.includes('naha') || text.includes('wena ekak') || text.includes('weradi')
    ) {
      return '📦 We sincerely apologize if an item is missing or incorrect. Please contact our support with your Order ID, and we will arrange a replacement or refund immediately.';
    }

    else if (
      text.includes('quality') || text.includes('tast') || text.includes('rasa') || 
      text.includes('aluth') || text.includes('parana') || text.includes('expire')
    ) {
      return '🥬 Quality is our priority! We pack vegetables and fruits on the same day of delivery. Expiry dates on groceries are strictly checked before dispatch.';
    }

    else if (
      text.includes('minimum') || text.includes('aduma') || text.includes('limit') || 
      text.includes('kiyaka')
    ) {
      return '🛍️ There is no minimum order value! You can order even a single item. However, remember that orders above Rs. 5000 get FREE delivery.';
    }

    else if (
      text.includes('app') || text.includes('play store') || text.includes('apple') || 
      text.includes('download')
    ) {
      return '📱 Currently, we do not have a mobile app. However, our website is fully mobile-friendly and you can easily order from your phone browser!';
    }

    else if (
      text.includes('forgot') || text.includes('amathakai') || text.includes('reset') || 
      text.includes('password')
    ) {
      return '🔑 If you forgot your password, please go to the Login page and click on "Forgot Password" to reset it via your email.';
    }

    else if (
      text.includes('organic') || text.includes('wasa wisa') || text.includes('beheth') || 
      text.includes('natural')
    ) {
      return '🌱 We have a special section for 100% Organic certified vegetables and fruits. Just search for "Organic" in the search bar!';
    }

    else if (
      text.includes('where do you deliver') || text.includes('area') || text.includes('palath') || 
      text.includes('kandy') || text.includes('galle') || text.includes('outstation')
    ) {
      return '🗺️ We currently provide express delivery to Colombo and Gampaha districts. Island-wide delivery is available for dry groceries within 2-3 days.';
    }

    else if (
      text.includes('driver') || text.includes('rider') || text.includes('g கொண்டு') || 
      text.includes('genena')
    ) {
      return '🛵 Our delivery rider will call you 15 minutes before reaching your location. Please keep your phone reachable!';
    }

    else if (
      text.includes('meat') || text.includes('fish') || text.includes('chicken') || 
      text.includes('mas') || text.includes('malu')
    ) {
      return '🥩 We provide fresh and frozen chicken, seafood, and meats in hygienic packaging. Search for "Meat" or "Seafood" above.';
    }

    else if (
      text.includes('fail') || text.includes('error') || text.includes('payment drop') || 
      text.includes('salli kapuna') || text.includes('decline')
    ) {
      return '⚠️ If your card payment failed but money was deducted, do not worry! It will automatically bounce back to your card in 24 hours. You can try again or use Cash on Delivery.';
    }

    else if (
      text.includes('who are you') || text.includes('owner') || text.includes('kauda') || 
      text.includes('about us')
    ) {
      return '🏢 We are LankaGrocery, a proudly Sri Lankan startup aiming to make fresh grocery shopping easy, affordable, and accessible for everyone!';
    }

    else if (
      text.includes('are you human') || text.includes('robot') || text.includes('bot') || 
      text.includes('machine')
    ) {
      return '🤖 I am LankaBot, your friendly AI shopping assistant! Im here 24/7 to answer your questions quickly.';
    }

    else if (text.includes('vegan') || text.includes('vegetarian') || text.includes('niramansa') || text.includes('mas nathi')) {
      return '🥦 We have a large variety of fresh vegetables, plant-based items, and vegan products! Search for "Vegan" to see them.';
    }
    
    else if (text.includes('halal') || text.includes('muslim') || text.includes('halal da')) {
      return '✅ Yes! Most of our processed foods and all our meat products are 100% Halal certified by suppliers.';
    }
    
    else if (text.includes('sugar free') || text.includes('diabetic') || text.includes('seeni nathi') || text.includes('seeni adu')) {
      return '⚕️ We care for your health. We have sugar-free biscuits, sweeteners, and low-GI rice varieties. Search "Sugar Free".';
    }
    
    else if (text.includes('spice') || text.includes('kulubadu') || text.includes('kudu') || text.includes('miris') || text.includes('kaha')) {
      return '🌶️ We sell high-quality Sri Lankan spices including unadulterated chili powder, turmeric, curry powder, and cinnamon!';
    }
    
    else if (text.includes('rice') || text.includes('haal') || text.includes('samba') || text.includes('nadu') || text.includes('kekulu')) {
      return '🍚 We have Keeri Samba, Nadu, Kakulu, and Basmati rice available in 1kg, 5kg, and 10kg bags.';
    }
    
    else if (text.includes('tea') || text.includes('coffee') || text.includes(' தேநீர்') || text.includes('te kola') || text.includes('kopi')) {
      return '☕ Start your day fresh! We have premium Ceylon Tea, Green Tea, and instant coffee brands in stock.';
    }
    
    else if (text.includes('snack') || text.includes('biscuit') || text.includes('bite') || text.includes('kema') || text.includes('biskat')) {
      return '🍪 Craving a snack? Check out our snacks category for Munchee, Maliban biscuits, chips, and traditional sweets.';
    }
   
    else if (text.includes('dairy') || text.includes('milk') || text.includes('cheese') || text.includes('butter') || text.includes('kiri')) {
      return '🥛 We deliver fresh milk, milk powder, cheese, butter, and yogurt stored in proper cooling conditions.';
    }
    
    else if (text.includes('bakery') || text.includes('bread') || text.includes('paan') || text.includes('cake') || text.includes('bun')) {
      return '🍞 We supply freshly baked bread, roast paan, buns, and cakes from top bakeries every morning!';
    }
   
    else if (text.includes('baby') || text.includes('nappy') || text.includes('pampers') || text.includes('baba') || text.includes('darwa')) {
      return '👶 For the little ones, we have baby cereal, milk formulas, diapers, and baby soap. Search "Baby" for all items.';
    }

    else if (text.includes('pet') || text.includes('dog') || text.includes('cat') || text.includes('balu') || text.includes('pusa') || text.includes('pedigree')) {
      return '🐶 🐱 We have Pedigree, Whiskas, and other pet food brands. Treat your furry friends today!';
    }
    
    else if (text.includes('clean') || text.includes('wash') || text.includes('soap') || text.includes('sabang') || text.includes('surf') || text.includes('kudu')) {
      return '🧼 Stock up on washing powder, dishwashing liquid, floor cleaners, and soaps from our Household category.';
    }
    
    else if (text.includes('shampoo') || text.includes('toothpaste') || text.includes('brush') || text.includes('body wash') || text.includes('beauti')) {
      return '🧴 We carry a range of personal care items including shampoo, toothpaste, face wash, and sanitary napkins.';
    }
    
    else if (text.includes('sweet') || text.includes('kewili') || text.includes('pani') || text.includes('dodol') || text.includes('kokis')) {
      return '🍯 Enjoy traditional Sri Lankan sweets like Kalu Dodol, Kokis, and Kithul Treacle sourced from authentic makers.';
    }
    
    else if (text.includes('drink') || text.includes('water') || text.includes('coca cola') || text.includes('juice') || text.includes('cool')) {
      return '🥤 Stay hydrated! We have bottled water, fruit juices, and carbonated soft drinks available.';
    }
   
    else if (text.includes('ice cream') || text.includes('elephant house') || text.includes('cargills') || text.includes('kothmale')) {
      return '🍦 We deliver ice cream in special cooling boxes so it reaches you perfectly frozen! Order your favorite flavor now.';
    }
    
    else if (text.includes('frozen') || text.includes('sausage') || text.includes('meatball') || text.includes('nugget')) {
      return '🧊 We have frozen sausages, meatballs, and nuggets. These are delivered in insulated bags to maintain freshness.';
    }
    
    else if (text.includes('import') || text.includes('foreign') || text.includes('pita rata') || text.includes('uk') || text.includes('dubai')) {
      return '✈️ We have a special "Imported" section featuring premium chocolates, sauces, and pasta from overseas.';
    }
    
    else if (text.includes('book') || text.includes('pen') || text.includes('pencil') || text.includes('school') || text.includes('poth')) {
      return '✏️ Need school items? We stock exercise books, pens, and basic stationery for your convenience.';
    }
    
    else if (text.includes('medicine') || text.includes('pharmacy') || text.includes('panadol') || text.includes('beheth')) {
      return '💊 We currently sell basic over-the-counter items like Panadol and Siddhalepa, but we do not sell prescription medicines.';
    }

    else if (text.includes('loyalty') || text.includes('point') || text.includes('lakuu') || text.includes('reward')) {
      return '⭐ You earn 1 point for every Rs. 100 spent! You can redeem these points for discounts on your next orders.';
    }
   
    else if (text.includes('promo code') || text.includes('voucher') || text.includes('coupon') || text.includes('code ekak')) {
      return '🎟️ You can apply your Promo Code at the Checkout page right before selecting your payment method.';
    }
    
    else if (text.includes('bank') || text.includes('credit card offer') || text.includes('boc') || text.includes('combank') || text.includes('sampath')) {
      return '💳 We frequently have weekend discounts (up to 20% off) for Sampath, Commercial, and HNB credit cards. Check the homepage banners!';
    }
    
    else if (text.includes('refer') || text.includes('friend') || text.includes('yaluwek') || text.includes('invite')) {
      return '🤝 Invite a friend to LankaGrocery! When they make their first purchase, you both get a Rs. 500 discount voucher.';
    }
    
    else if (text.includes('hamper') || text.includes('avurudu') || text.includes('christmas') || text.includes('gift box')) {
      return '🎁 We create special grocery hampers during Sinhala/Tamil New Year and Christmas. They make perfect corporate gifts!';
    }
    
    else if (text.includes('free gift') || text.includes('nikan') || text.includes('nomile')) {
      return '🎉 Sometimes we slip in a free sample or a small gift for orders above Rs. 10,000 as a surprise! Keep ordering!';
    }
    
    else if (text.includes('aduwata') || text.includes('wholesale discount') || text.includes('loku ganak')) {
      return '📉 If you are buying in large bulk quantities, please contact our manager at 011-2345678 to arrange a special discounted price.';
    }
    
    else if (text.includes('season') || text.includes('offer thiyenawada') || text.includes('wasak')) {
      return '🎊 Yes! We have seasonal sales every month. Make sure you are subscribed to our newsletter to get the alerts.';
    }
    
    else if (text.includes('clearance') || text.includes('short expiry') || text.includes('keti kalayak')) {
      return '🛒 We have a "Clearance" category where safe, short-expiry products are sold at up to 70% off!';
    }
    
    else if (text.includes('price match') || text.includes('ehe adui') || text.includes('keells') || text.includes('cargills') || text.includes('arpico')) {
      return '⚖️ We strive to keep our prices lower than or equal to major supermarkets. If you find a massive price difference, let us know!';
    }

    else if (text.includes('add item') || text.includes('thawa danna') || text.includes('amathaka una')) {
      return '➕ Forgot something? If your order is not yet dispatched, call us immediately on 011-2345678 to add items to the same bill.';
    }
    
    else if (text.includes('remove item') || text.includes('ayain karanna') || text.includes('epa')) {
      return '➖ To remove an item from a placed order, please call our hotline before it gets packed. We will adjust the total.';
    }
    
    else if (text.includes('change address') || text.includes('wena address') || text.includes('maru karanna address')) {
      return '📍 You can change your default address in your Profile. If you already placed an order and need to change its destination, call us ASAP!';
    }
    
    else if (text.includes('send as gift') || text.includes('gift order') || text.includes('wena kenekuta') || text.includes('yawanawa')) {
      return '🎁 Yes! Just enter your friends address at checkout and pay online via Card/LankaQR. We will deliver it to them without the price tag if requested.';
    }
    
    else if (text.includes('invoice') || text.includes('receipt') || text.includes('bill') || text.includes('bila')) {
      return '🧾 A digital invoice is emailed to you instantly. A printed receipt will also be attached to your delivery box.';
    }
    
    else if (text.includes('tax') || text.includes('vat') || text.includes('baddak') || text.includes('hidden charge')) {
      return '💰 Our prices are mostly inclusive of all applicable taxes. The final amount you see at checkout is all you have to pay. No hidden fees!';
    }
    
    else if (text.includes('reorder') || text.includes('again') || text.includes('aayeth') || text.includes('kalin gaththa')) {
      return '🔄 To reorder, go to your Profile > My Orders, click on the previous order, and you can easily add the same items back to your cart!';
    }
    
    else if (text.includes('pre order') || text.includes('kalin kiyanna') || text.includes('booking')) {
      return '📅 We currently do not take pre-orders for out-of-stock items, but you can add them to your Wishlist to get notified when they arrive.';
    }
    
    else if (text.includes('out of stock') || text.includes('badu iwarai') || text.includes('nadda') || text.includes('empty')) {
      return '📉 Out-of-stock items are usually replenished within 24-48 hours. Check back soon!';
    }
    
    else if (text.includes('limit') || text.includes('how many can i buy') || text.includes('uparima') || text.includes('kilo kiyada')) {
      return '⚖️ To ensure fair distribution during shortages, some essential items (like sugar/rice) might have a maximum limit of 5kg per order.';
    }

    else if (text.includes('fast') || text.includes('ikmanata') || text.includes('express') || text.includes('1 hour') || text.includes('urgent') || text.includes('hadiysi')) {
      return '⚡ We offer "Express Delivery" (within 2 hours) for selected areas in Colombo. Look for the Express option at checkout!';
    }
    
    else if (text.includes('gate') || text.includes('security') || text.includes('guard') || text.includes('leave outside')) {
      return '🚪 If you want us to leave the package with your security guard or at the gate, please add a note at Checkout!';
    }
    
    else if (text.includes('apartment') || text.includes('flat') || text.includes('stairs') || text.includes('floor') || text.includes('uda thattuwata')) {
      return '🏢 Yes, our riders will deliver directly to your apartment door, even if there is no elevator!';
    }
    
    else if (text.includes('rain') || text.includes('wassa') || text.includes('weather') || text.includes('flood') || text.includes('parakku')) {
      return '🌧️ During heavy rain or bad weather, deliveries might face slight delays for the safety of our riders. We appreciate your patience!';
    }
    
    else if (text.includes('plastic') || text.includes('polythene') || text.includes('eco') || text.includes('bag') || text.includes('kopi kodi')) {
      return '🌍 We use recyclable paper bags and cardboard boxes for 90% of our packaging to reduce plastic waste.';
    }
    
    else if (text.includes('poya') || text.includes('holiday') || text.includes('niwadu') || text.includes('sunday')) {
      return '🌕 We deliver 365 days a year, including Poya days, Sundays, and Mercantile holidays!';
    }
    
    else if (text.includes('contactless') || text.includes('corona') || text.includes('ath ganna epa')) {
      return '📦 Just pay online and mention "Contactless" in the order notes. Our rider will leave the box at your door and step back.';
    }
    
    else if (text.includes('midnight') || text.includes('night') || text.includes('re') || text.includes('raata')) {
      return '🌙 We currently do not offer midnight delivery. Our last dispatch is at 6:00 PM, delivering until 8:00 PM.';
    }
    
    else if (text.includes('where is driver') || text.includes('rider location') || text.includes('koheda inne') || text.includes('map')) {
      return '🗺️ Live map tracking is coming soon! For now, the rider will call you when they are 15 minutes away.';
    }
    
    else if (text.includes('tip') || text.includes('santhosam') || text.includes('extra money') || text.includes('keep change')) {
      return '💸 Tipping is completely optional but highly appreciated by our hardworking riders. You can tip them directly in cash.';
    }

    else if (text.includes('otp') || text.includes('sms awith na') || text.includes('code awena') || text.includes('verify')) {
      return '📱 If you did not receive an OTP, please check if your signal is strong, or click "Resend Code". If it still fails, contact support.';
    }
    
    else if (text.includes('lock') || text.includes('block') || text.includes('hirawela') || text.includes('log wenna ba')) {
      return '🔒 Accounts are locked after 5 failed login attempts for security. Please use "Forgot Password" to reset it and unlock your account.';
    }
    
    else if (text.includes('cart empty') || text.includes('badu makila') || text.includes('nathi wela') || text.includes('bug')) {
      return '🛒 If your cart emptied suddenly, try refreshing the page or logging in again. Your items are usually saved to your profile.';
    }
    
    else if (text.includes('slow') || text.includes('stuck') || text.includes('load wenne na') || text.includes('hira wenawa')) {
      return '🐢 Sorry about that! We might be experiencing high traffic. Please clear your browser cache or try again in a few minutes.';
    }
    
    else if (text.includes('change number') || text.includes('aluth number') || text.includes('update phone')) {
      return '📱 You can update your phone number by going to your Profile settings. Make sure to save the changes!';
    }
    
    else if (text.includes('delete account') || text.includes('account eka makanna') || text.includes('ain karanna')) {
      return '🗑️ To permanently delete your account and data, please email a request to privacy@lankagrocery.com.';
    }
    
    else if (text.includes('unsubscribe') || text.includes('stop email') || text.includes('email epa') || text.includes('spam')) {
      return '✉️ You can click the "Unsubscribe" link at the bottom of any promotional email we send you. We hate spam too!';
    }
    
    else if (text.includes('language') || text.includes('sinhala') || text.includes('tamil') || text.includes('bhashawa')) {
      return '🌐 Currently, our interface is in English, but you can chat with me in Singlish! Full multi-language support is coming soon.';
    }
    
    else if (text.includes('dark mode') || text.includes('kalu paata') || text.includes('theme')) {
      return '🌙 Dark mode is not yet available, but our developers are working hard to bring it in the next update!';
    }
    
    else if (text.includes('save card') || text.includes('card details') || text.includes('hack') || text.includes('steal')) {
      return '💳 We DO NOT save your credit card details on our servers. All payments are securely processed by PayPal directly.';
    }

    else if (text.includes('koko') || text.includes('mintpay') || text.includes('pay later') || text.includes('nayatada') || text.includes('pasu gewima')) {
      return '⏳ We do not support Buy-Now-Pay-Later (BNPL) services like Koko or Mintpay for groceries at the moment.';
    }
    
    else if (text.includes('bank transfer') || text.includes('account number') || text.includes('deposit') || text.includes('salli danna')) {
      return '🏦 To do a direct bank transfer, please select "Cash on Delivery", and contact our hotline. We will provide our Commercial Bank account details.';
    }
    
    else if (text.includes('abroad') || text.includes('overseas') || text.includes('pita rata idan') || text.includes('send to sri lanka')) {
      return '✈️ Yes! You can order from anywhere in the world and pay via PayPal/Card. Just put your family\'s Sri Lankan address as the Shipping Address.';
    }
    
    else if (text.includes('installment') || text.includes('emi') || text.includes('keli walata') || text.includes('gewanna')) {
      return '📆 Groceries are not eligible for card installment plans. Full payment is required at checkout.';
    }
    
    else if (text.includes('double') || text.includes('deparak') || text.includes('twice') || text.includes('salli deparak')) {
      return '⚠️ If you were charged twice due to a system glitch, do not panic! Please share your Order ID and we will initiate a refund for the extra charge immediately.';
    }
    
    else if (text.includes('maru kasi') || text.includes('change na') || text.includes('ithuru') || text.includes('no change')) {
      return '💵 Our delivery riders always carry sufficient change. But if you are paying a Rs. 5000 note for a small bill, please add a note at checkout!';
    }
    
    else if (text.includes('cheque') || text.includes('chek') || text.includes('check pay')) {
      return '✍️ We only accept Corporate Cheques for registered B2B wholesale businesses. We do not accept personal cheques.';
    }
    
    else if (text.includes('lankaqr fail') || text.includes('scan wenne na') || text.includes('qr wada na')) {
      return '📲 If the QR code isn\'t scanning, try increasing your phone brightness. If it still fails, you can switch to Cash on Delivery.';
    }
    
    else if (text.includes('wallet') || text.includes('store credit') || text.includes('mage salli')) {
      return '👛 Store credit and Wallet features are coming in our next app update! You will be able to top-up easily.';
    }

    else if (text.includes('supplier') || text.includes('sell to you') || text.includes('wikunanna') || text.includes('farm') || text.includes('waga karana')) {
      return '🚜 We love supporting local farmers! Please email your product details and prices to purchasing@lankagrocery.com.';
    }
    
    else if (text.includes('franchise') || text.includes('branch') || text.includes('shakha')) {
      return '🏬 Currently, we operate entirely online from our main fulfillment center. We do not offer physical franchise models.';
    }
    
    else if (text.includes('job') || text.includes('vacancy') || text.includes('rakiya') || text.includes('wada') || text.includes('hire') || text.includes('career')) {
      return '💼 We are always looking for riders, packers, and developers! Send your CV to careers@lankagrocery.com.';
    }
    
    else if (text.includes('invest') || text.includes('buy shares') || text.includes('funding')) {
      return '📈 For investment and partnership inquiries, please reach out to our CEO via investors@lankagrocery.com.';
    }
    
    else if (text.includes('human') || text.includes('agent') || text.includes('minisaha') || text.includes('representative') || text.includes('chat with person')) {
      return '👨‍💻 I am an AI, but if you need human assistance, please call 011-2345678 between 8 AM and 6 PM to speak to a real agent.';
    }
    
    else if (text.includes('complain') || text.includes('driver bad') || text.includes('baninna') || text.includes('rude') || text.includes('late driver')) {
      return '🚨 We take customer service very seriously. Please call our hotline immediately with your Order ID, and we will take action against the rider.';
    }
    
    else if (text.includes('bug') || text.includes('glitch') || text.includes('error code') || text.includes('awulak')) {
      return '🛠️ Found a bug? Wow, thanks for letting us know! Please email a screenshot to dev@lankagrocery.com so our IT team can squash it.';
    }
    
    else if (text.includes('manager') || text.includes('boss') || text.includes('lokka')) {
      return '👔 To speak directly to our Customer Success Manager, dial our hotline 011-2345678 and request a transfer.';
    }
    
    else if (text.includes('privacy') || text.includes('terms') || text.includes('conditions') || text.includes('nithi')) {
      return '📜 You can read our full Privacy Policy and Terms of Service by scrolling to the very bottom of our website (Footer).';
    }
    
    else if (text.includes('clean') || text.includes('cut') || text.includes('sudda') || text.includes('kapala') || text.includes('kapa denawada')) {
      return '🔪 Yes! All our fish and meat items are pre-cleaned, cut into standard pieces, and hygienically vacuum-packed before delivery.';
    }
    
    else if (text.includes('ripe') || text.includes('idila') || text.includes('pahi') || text.includes('idunu')) {
      return '🍌 We select perfectly ripe fruits for immediate consumption. If you need semi-ripe fruits for later, please add a note at checkout!';
    }
    
    else if (text.includes('expire') || text.includes('kaldut') || text.includes('date eka')) {
      return '📅 We have a strict policy to never dispatch items that have less than 3 months to expire (unless in the Clearance section).';
    }
    
    else if (text.includes('store') || text.includes('fridge') || text.includes('thiyaganne') || text.includes('parissam')) {
      return '❄️ Leafy greens and meats should be refrigerated immediately. Dry items like rice and spices can be stored at room temperature.';
    }
    
    else if (text.includes('request') || text.includes('genath denawada') || text.includes('illanna') || text.includes('oni baduwak')) {
      return '📝 Cannot find an item? Email us what you need at support@lankagrocery.com and we will try to stock it for you next week!';
    }
    
    else if (text.includes('best seller') || text.includes('wediya yanne') || text.includes('popular') || text.includes('janapriya')) {
      return '🏆 Our best sellers are Keeri Samba, Fresh Carrots, Munchee Super Cream Cracker, and Anchor Milk Powder! Check them on the home page.';
    }
    
    else if (text.includes('new') || text.includes('aluth') || text.includes('latest')) {
      return '✨ We add fresh produce every morning and new grocery items every Monday. Check the "Latest Products" section!';
    }
    
    else if (text.includes('pickup') || text.includes('awith ganna') || text.includes('takeaway') || text.includes('store eken')) {
      return '🛍️ Currently, we only offer delivery services. Store pickup is not available due to warehouse safety regulations.';
    }
    
    else if (text.includes('alcohol') || text.includes('liquor') || text.includes('beer') || text.includes('arrack') || text.includes('beema')) {
      return '🚫 We strictly DO NOT sell alcohol, liquor, or any intoxicating substances on our platform.';
    }
    
    else if (text.includes('cigarette') || text.includes('smoke') || text.includes('sigaret') || text.includes('dum')) {
      return '🚭 We DO NOT sell cigarettes or tobacco products. We promote a healthy lifestyle!';
    }

    else if (text.includes('joke') || text.includes('hinahawena') || text.includes('funny') || text.includes('wihilu')) {
      return '😂 Why did the tomato turn red? Because it saw the salad dressing!';
    }
    
    else if (text.includes('good night') || text.includes('subha rathriyak') || text.includes('nida') || text.includes('bye')) {
      return '🌙 Good night! Take care and don\'t forget to buy your breakfast groceries from us tomorrow!';
    }
    
    else if (text.includes('happy new year') || text.includes('christmas') || text.includes('awurudu') || text.includes('subha')) {
      return '🎆 Thank you! Wishing you and your family a very happy and prosperous season filled with good food!';
    }
    
    else if (text.includes('weather') || text.includes('kalaguna') || text.includes('wahinawada') || text.includes('rasnei')) {
      return '☀️ Rain or shine, we deliver! Stay inside, relax, and let us bring the groceries to you.';
    }
    
    else if (text.includes('smart') || text.includes('modaya') || text.includes('intelligent') || text.includes('daksha')) {
      return '🧠 I know the price of every vegetable in our store, so I guess I am pretty smart at groceries!';
    }
    
    else if (text.includes('cook') || text.includes('uyanna') || text.includes('recipe') || text.includes('kema hadanna')) {
      return '🍳 I can\'t cook because I live inside your screen, but I can deliver the best ingredients for you to cook a masterpiece!';
    }
    
    else if (text.includes('boring') || text.includes('kammali') || text.includes('palu') || text.includes('ninda yanawa')) {
      return '🥱 Bored? Why not browse our snacks section? A packet of chips or some chocolate might cheer you up!';
    }
    
    else if (text.includes('love') || text.includes('adarei') || text.includes('marry') || text.includes('bada ganna')) {
      return '💚 Aw, I love you too! But my heart belongs to fresh vegetables and fast deliveries.';
    }
    
    else if (text.includes('fuck') || text.includes('shit') || text.includes('bitch') || text.includes('huth') || text.includes('paka') || text.includes('wesi')) {
      return '🛑 Please use respectful language. If you have an issue with our service, call our management at 011-2345678 and we will fix it immediately.';
    }
    
    else if (text.includes('where is sri lanka') || text.includes('lankawe koheda') || text.includes('country')) {
      return '🇱🇰 Sri Lanka is a beautiful island in the Indian Ocean, and we deliver fresh groceries across its major cities!';
    }
    
    else if (text.includes('owner name') || text.includes('ayithikaraya') || text.includes('founder') || text.includes('boss kauda')) {
      return '👑 LankaGrocery was founded by a passionate Sri Lankan team dedicated to changing the way people shop for daily needs.';
    }
    
    else if (text.includes('chatgpt') || text.includes('gemini') || text.includes('openai') || text.includes('ai tool')) {
      return '🤖 I am LankaBot, a specialized AI built specifically to help you navigate LankaGrocery. I only know about groceries and deliveries!';
    }

    else if (text === 'yes' || text === 'ow' || text === 'yeah' || text === 'yep' || text === 'y' || text === 'aniwa') {
      return 'Great! 👍 Feel free to explore our categories or type the name of the item you are looking for.';
    }

    else if (text === 'ok' || text === 'okay' || text === 'hari' || text === 'ela' || text === 'elakiri' || text === 'kk') {
      return 'Awesome! Let me know if you need help finding anything else. 🛒';
    }
    else if (text === 'hmm' || text === 'hm' || text === 'ha' || text === 'haa' || text === 'hmmm') {
    return 'Take your time! I am right here if you need any assistance. 😊';
    }
    else if (text === 'no' || text === 'na' || text === 'naha' || text === 'epa' || text === 'nah' || text === 'natha') {
    return 'No worries! If you change your mind or need something else, just let me know. ✌️';
    }
    else if (text === 'wow' || text.includes('niyamai') || text.includes('maru') || text.includes('patta') || text.includes('supiri') || text === 'great') {
    return 'Glad you like it! ❤️ We always try our best to give you a great shopping experience.';
    }
    else if (text === 'what' || text.includes('mokak') || text.includes('mokadda') || text.includes('therune na')) {
    return 'Could you please explain a bit more? You can ask about products, delivery, payments, or your order status. 🤔';
    }
    else if (text === 'why' || text === 'ai' || text.includes('hethuwa')) {
    return 'That is just how our system is designed to provide you with the best and most secure service! If you have a specific issue, call 011-2345678.';
    }
    else if (text === 'please' || text.includes('karunakara') || text.includes('puluwanda')) {
    return 'I would love to help! Please tell me exactly what you need. 😇';
    }
    else if (text === 'help' || text === 'udaw' || text.includes('help me') || text.includes('support')) {
    return 'I am here to help! 🦸‍♂️ Do you need help with Finding Items, Making a Payment, or Tracking an Order?';
    }
    else if (text.includes('done') || text.includes('iwarai') || text.includes('kala') || text.includes('finished')) {
    return 'Perfect! 🎉 If your order is placed, you will receive an email confirmation shortly.';
    }
    else if (text === 'sorry' || text.includes('samawenna') || text.includes('waraduna') || text.includes('my bad')) {
    return 'Oh, no need to apologize at all! We are here to make things easy for you. 😊';
    }
    else if (text === 'wait' || text.includes('inna') || text.includes('poddak') || text.includes('hold')) {
    return 'Sure, take your time! I will be waiting right here. ⏳';
    }
    else if (text === 'really' || text.includes('aththada') || text.includes('sirawata') || text.includes('sira')) {
    return 'Yes, absolutely! 100% true. We do not joke when it comes to serving our customers! 😉';
    }
    else if (text === 'morning' || text === 'night' || text.includes('subha dawasak') || text.includes('good day')) {
    return 'Wishing you a wonderful time too! Let me know if you want to order some fresh groceries today. 🌅';
    }
    else if (text.includes('just looking') || text.includes('nikan baluwe') || text.includes('balanna awe')) {
    return 'Take a look around! We have some great discounts on fresh vegetables and household items right now. 👀';
    }
    else if (text.includes('wena') || text.includes('anything else') || text.includes('thawa')) {
    return 'We have over 500+ items! Try searching for "Snacks", "Dairy", or "Beverages" at the top search bar. 🔍';
    }
    else if (text === 'sugar' || text === 'seeni' || text.includes('sini')) {
    return 'Looking for Sugar? 🍚 We have White Sugar, Brown Sugar, and Sugar-free alternatives. Just type "Sugar" in the main search bar!';
    }
    else if (text === 'dhal' || text === 'parippu' || text.includes('mysore')) {
    return 'We have premium Mysore Dhal and Yellow Dhal! 🍲 Search for "Dhal" to add it to your cart.';
    }
    else if (text === 'egg' || text === 'eggs' || text === 'biththara' || text.includes('bitthara')) {
    return 'Fresh farm eggs available! 🥚 We have Brown Eggs, White Eggs, and Organic Eggs in packs of 10 or 30.';
    }
    else if (text === 'coconut' || text === 'pol' || text.includes('pol gedi')) {
    return '🥥 Fresh coconuts, coconut milk powder (Maggi/Nestle), and pure coconut oil are available in stock!';
    }
    else if (text === 'onion' || text === 'garlic' || text === 'lunu' || text.includes('sudu lunu') || text.includes('b lunu')) {
    return '🧅 We have Bombay Onions, Red Onions, and Garlic. All properly sorted and cleaned!';
    }
    else if (text === 'potato' || text === 'potatoes' || text === 'ala') {
    return '🥔 Fresh Nuwara Eliya potatoes and imported potatoes are available. Perfect for your curries!';
    }
    else if (text === 'water' || text === 'wathura' || text.includes('bottle')) {
    return '💧 Need drinking water? We have 1L, 1.5L, and 5L bottled water from top brands ready for delivery.';
    }
    else if (text === 'noodles' || text === 'pasta' || text === 'nudals' || text.includes('maggi')) {
    return '🍜 Maggi, Prima, and imported Pasta varieties are available in our "Pantry" section!';
    }
    else if (text === 'salt' || text.includes('lunu kudu')) {
    return '🧂 Iodized table salt and sea salt packets are available. Search for "Salt" above.';
    }
    else if (text === 'chicken' || text.includes('kukul mas')) {
    return '🍗 We have Whole Chicken, Chicken Breast, and Curry Pieces from Bairaha and Crysbro. Search "Chicken".';
    }
    else if (text === 'biscuit' || text === 'biscuits' || text === 'biskat') {
    return '🍪 Cream crackers, chocolate biscuits, wafers, and more! Maliban and Munchee are fully stocked.';
    }
    else if (text === 'bread' || text === 'paan' || text === 'pan') {
    return '🍞 Sliced bread, roast paan, and sandwich bread are delivered fresh every day!';
    }
    else if (text === 'soap' || text === 'saban' || text.includes('sabaan')) {
    return '🧼 We have bathing soap (Sunlight, Lux, Lifebuoy) and laundry soap. Check the "Household" category.';
    }

    else if (text === 'apple' || text === 'apel') {
      return '🍎 Fresh apples (Red, Green, Fuji) are available in our Fruits section!';
    }
    else if (text === 'banana' || text === 'kesel') {
      return '🍌 We have Ambul, Anamalu, and Cavendish bananas. Check the Fruits category.';
    }
    else if (text === 'mango' || text === 'amba') {
      return '🥭 Fresh Karthakolomban and Willard mangoes are in stock based on the season!';
    }
    else if (text === 'orange' || text === 'dodam') {
      return '🍊 Sweet imported oranges and local dodam are available now.';
    }
    else if (text === 'grapes' || text === 'midi') {
      return '🍇 We have Red, Green, and Black seedless grapes.';
    }
    else if (text === 'papaya' || text === 'gaslabu') {
      return '🍈 Freshly picked Red Lady papayas are available.';
    }
    else if (text === 'pineapple' || text === 'annasi') {
      return '🍍 Sweet Mauritius pineapples are ready to order.';
    }
    else if (text === 'watermelon' || text === 'komadu') {
      return '🍉 Refreshing watermelons are available in whole or halves.';
    }
    else if (text === 'avocado' || text === 'alipera') {
      return '🥑 Creamy avocados are in stock. Great for juices and salads!';
    }
    else if (text === 'strawberry' || text === 'stoberi') {
      return '🍓 Fresh Nuwara Eliya strawberries are available in 250g packs.';
    }
    else if (text === 'carrot' || text === 'karat') {
      return '🥕 Fresh Nuwara Eliya carrots are available per kg or 500g.';
    }
    else if (text === 'beans' || text === 'bonchi') {
      return '🌱 Fresh green beans are available in the Vegetables section.';
    }
    else if (text === 'leeks' || text === 'liks') {
      return '🧅 Fresh leeks are available today.';
    }
    else if (text === 'cabbage' || text === 'gowa') {
      return '🥬 Green and Red cabbage are available.';
    }
    else if (text === 'tomato' || text === 'thakkali') {
      return '🍅 Fresh salad tomatoes and cooking tomatoes are in stock.';
    }
    else if (text === 'ginger' || text === 'inguru') {
      return '🫚 Fresh ginger roots available in 100g and 250g packs.';
    }
    else if (text === 'chili' || text === 'miris') {
      return '🌶️ Green chilies and capsicums are available fresh today.';
    }
    else if (text === 'lime' || text === 'dehi') {
      return '🍋 Fresh local limes are available.';
    }
    else if (text === 'lemon' || text === 'leman') {
      return '🍋 Imported yellow lemons are in stock.';
    }
    else if (text === 'pumpkin' || text === 'wattakka') {
      return '🎃 Sliced and whole pumpkins are available.';
    }
    else if (text === 'beef' || text === 'harak mas') {
      return '🥩 Premium beef cuts (steak, cubes, minced) are available.';
    }
    else if (text === 'pork' || text === 'uru mas') {
      return '🥓 Fresh and frozen pork cuts are available in the Meat section.';
    }
    else if (text === 'mutton' || text === 'elu mas') {
      return '🍖 High-quality mutton is available on pre-order and daily stock.';
    }
    else if (text === 'prawn' || text === 'isso') {
      return '🦐 Fresh and frozen tiger prawns and lagoon prawns available.';
    }
    else if (text === 'crab' || text === 'kakuluwo') {
      return '🦀 Lagoon crabs and sea crabs are available in Seafood.';
    }
    else if (text === 'squid' || text === 'dallo') {
      return '🦑 Cleaned squid (dallo) available in 500g packs.';
    }
    else if (text === 'fish' || text === 'malu') {
      return '🐟 We have Thalapath, Kelawalla, Balaya, and Salaya fresh today.';
    }
    else if (text === 'salmon' || text === 'saman') {
      return '🥫 Canned salmon (mackerel) and fresh salmon fillets are in stock.';
    }
    else if (text === 'tuna' || text === 'kelawalla') {
      return '🍣 Fresh yellowfin tuna available in the Seafood category.';
    }
    else if (text === 'sprats' || text === 'halmasso') {
      return '🐟 Dried and fresh sprats available.';
    }
    else if (text === 'pepper' || text === 'gammiris') {
      return '🧂 Black pepper powder and whole peppercorns available.';
    }
    else if (text === 'cinnamon' || text === 'kurundu') {
      return '🪵 Pure Ceylon cinnamon sticks and powder in stock.';
    }
    else if (text === 'cardamom' || text === 'ensal') {
      return '🌿 Premium cardamom pods available in the Spices section.';
    }
    else if (text === 'clove' || text === 'karabu') {
      return '🤎 High-quality cloves available in 50g packs.';
    }
    else if (text === 'mustard' || text === 'aba') {
      return '🟡 Mustard seeds and mustard cream/paste are in stock.';
    }
    else if (text === 'cumin' || text === 'suduru') {
      return '🌿 Cumin seeds and roasted cumin powder available.';
    }
    else if (text === 'coriander' || text === 'koththamalli') {
      return '🌱 Coriander seeds, powder, and fresh coriander leaves available.';
    }
    else if (text === 'fenugreek' || text === 'uluhal') {
      return '🌾 Fenugreek seeds available in 100g packs.';
    }
    else if (text === 'curry leaves' || text === 'karapincha') {
      return '🍃 Fresh curry leaves available (often free with large veg orders!).';
    }
    else if (text === 'pandan' || text === 'rampe') {
      return '🌿 Fresh pandan leaves available.';
    }
    else if (text === 'milo' || text === 'maailo') {
      return '🍫 Milo powder and RTD tetra packs available in Beverages.';
    }
    else if (text === 'nescafe' || text === 'nescafe') {
      return '☕ Nescafe Classic and Gold available in jars and sachets.';
    }
    else if (text === 'fanta' || text === 'fanta') {
      return '🥤 Fanta orange and portello available in 1L and 1.5L bottles.';
    }
    else if (text === 'sprite' || text === 'sprite') {
      return '🍋 Sprite available in various bottle sizes.';
    }
    else if (text === 'coke' || text === 'cocacola') {
      return '🥤 Coca-Cola available in cans, 1L, and 1.5L bottles.';
    }
    else if (text === 'pepsi' || text === 'pepsi') {
      return '🥤 Pepsi available in the Beverages section.';
    }
    else if (text === 'faluda' || text === 'faluda') {
      return '🍹 Faluda syrup and ready-to-drink faluda available.';
    }
    else if (text === 'cordial' || text === 'cordial') {
      return '🧃 MD and Sunquick cordials available in multiple flavors.';
    }
    else if (text === 'soda' || text === 'soda') {
      return '🫧 Club soda available in cans and bottles.';
    }
    else if (text === 'chips' || text === 'bite') {
      return '🥔 Cassava chips, potato chips, and tortilla chips available.';
    }
    else if (text === 'mixture' || text === 'mikchar') {
      return '🥣 Bombay mixture and spicy mixtures available in Snacks.';
    }
    else if (text === 'murukku' || text === 'murukku') {
      return '🥨 Spicy and sweet murukku packs available.';
    }
    else if (text === 'cashew' || text === 'kaju') {
      return '🥜 Raw, roasted, and salted cashews available.';
    }
    else if (text === 'peanut' || text === 'rata kaju') {
      return '🥜 Roasted peanuts and peanut butter available.';
    }
    else if (text === 'chocolate' || text === 'choklat') {
      return '🍫 Kandos, Ritzbury, Dairy Milk, and imported chocolates in stock.';
    }
    else if (text === 'toffee' || text === 'tofi') {
      return '🍬 Various toffees and hard candies available.';
    }
    else if (text === 'jujubes' || text === 'jujubs') {
      return '🍬 Sweet jujubes available in 100g and 200g packs.';
    }
    else if (text === 'marshmallow' || text === 'mashmelo') {
      return '🍡 Soft marshmallows available in the Sweets section.';
    }
    else if (text === 'gum' || text === 'chewing gum') {
      return '🫧 Chewing gum and mints available.';
    }
    else if (text === 'flour' || text === 'piti') {
      return '🌾 Wheat flour, rice flour, and kurakkan flour available.';
    }
    else if (text === 'yeast' || text === 'yist') {
      return '🍞 Active dry yeast available for baking.';
    }
    else if (text === 'baking powder' || text === 'bekin paudar') {
      return '🧁 Baking powder and baking soda in stock.';
    }
    else if (text === 'vanilla' || text === 'wanila') {
      return '🍦 Vanilla essence and extract available.';
    }
    else if (text === 'icing' || text === 'aising') {
      return '🎂 Icing sugar available in 500g packs.';
    }
    else if (text === 'butter' || text === 'batar') {
      return '🧈 Anchor, Astra, and Pelwatte butter available.';
    }
    else if (text === 'margarine' || text === 'astra') {
      return '🧈 Margarine and fat spreads available.';
    }
    else if (text === 'cocoa' || text === 'koko') {
      return '🍫 Cocoa powder available for baking and drinks.';
    }
    else if (text === 'coloring' || text === 'kalarin') {
      return '🎨 Food coloring (various colors) available in Baking needs.';
    }
    else if (text === 'essence' || text === 'esen') {
      return '💧 Almond, rose, and banana essence available.';
    }
    else if (text === 'oats' || text === 'ots') {
      return '🥣 Quaker oats and local oats available in Breakfast.';
    }
    else if (text === 'cornflakes' || text === 'konfleks') {
      return '🥣 Kellogg\'s and other cornflakes brands in stock.';
    }
    else if (text === 'samaposha' || text === 'samaposha') {
      return '🌾 Samaposha packets available in 200g and 500g.';
    }
    else if (text === 'cereal' || text === 'siriyal') {
      return '🥣 Various breakfast cereals and muesli available.';
    }
    else if (text === 'jam' || text === 'jam') {
      return '🍓 MD and Kist jams (Strawberry, Woodapple, Mixed Fruit) available.';
    }
    else if (text === 'honey' || text === 'pani') {
      return '🍯 Pure bee honey and kithul treacle in stock.';
    }
    else if (text === 'marmalade' || text === 'mamaled') {
      return '🍊 Orange marmalade available.';
    }
    else if (text === 'cheese' || text === 'chis') {
      return '🧀 Happy Cow, Kotmale, and Kraft cheese available.';
    }
    else if (text === 'sausage' || text === 'sosaj') {
      return '🌭 Chicken, beef, and pork sausages available in Frozen.';
    }
    else if (text === 'yoghurt' || text === 'yogat') {
      return '🍨 Highland, Kotmale, and Newdale yoghurts available.';
    }
    else if (text === 'curd' || text === 'meekiri') {
      return '🏺 Fresh clay pot curd (meekiri) available.';
    }
    else if (text === 'paneer' || text === 'panir') {
      return '🧀 Frozen paneer cubes and blocks available.';
    }
    else if (text === 'condensed milk' || text === 'tin kiri') {
      return '🥛 Milkmaid and other condensed milk brands in stock.';
    }
    else if (text === 'whipping cream' || text === 'wipin krim') {
      return '🧁 Anchor and Kotmale whipping cream available.';
    }
    else if (text === 'fresh milk' || text === 'fesh kiri') {
      return '🥛 Anchor, Highland, and Ambewela fresh milk in 1L packs.';
    }
    else if (text === 'milk powder' || text === 'kiri piti') {
      return '🥛 Anchor, Ratthi, Pelwatte, and Highland milk powder available.';
    }
    else if (text === 'ghee' || text === 'gi') {
      return '🧈 Pure cow ghee available in jars.';
    }
    else if (text === 'vim' || text === 'vim') {
      return '🧼 Vim dishwashing liquid and bars available.';
    }
    else if (text === 'harpic' || text === 'harpic') {
      return '🚽 Harpic toilet cleaner available in Household.';
    }
    else if (text === 'lysol' || text === 'lysol') {
      return '🧹 Lysol floor cleaners in various scents available.';
    }
    else if (text === 'dettol' || text === 'detol') {
      return '🏥 Dettol antiseptic liquid, soaps, and handwash in stock.';
    }
    else if (text === 'mop' || text === 'mop') {
      return '🧹 Floor mops and replacement heads available.';
    }
    else if (text === 'broom' || text === 'idala') {
      return '🧹 Brooms and ekel brooms (idala) available.';
    }
    else if (text === 'brush' || text === 'burusuwa') {
      return '🪥 Cleaning brushes and toothbrushes available.';
    }
    else if (text === 'bucket' || text === 'baldiya') {
      return '🪣 Plastic buckets and basins available in Household.';
    }
    else if (text === 'garbage bag' || text === 'kunu uara') {
      return '🗑️ Garbage bags in Small, Medium, and Large sizes.';
    }
    else if (text === 'tissue' || text === 'tishu') {
      return '🧻 Facial tissues and toilet paper rolls available.';
    }
    else if (text === 'shampoo' || text === 'shampu') {
      return '🧴 Sunsilk, Clear, and Lifebuoy shampoos in stock.';
    }
    else if (text === 'conditioner' || text === 'kandishanar') {
      return '🧴 Hair conditioners from top brands available.';
    }
    else if (text === 'face wash' || text === 'fes wash') {
      return '🧼 Face wash products for all skin types available.';
    }
    else if (text === 'lotion' || text === 'loshan') {
      return '🧴 Body lotions and moisturizers available in Personal Care.';
    }
    else if (text === 'cream' || text === 'krim') {
      return '🧴 Face creams and fairness creams available.';
    }
    else if (text === 'razor' || text === 'rezer') {
      return '🪒 Disposable razors and shaving kits available.';
    }
    else if (text === 'shaving cream' || text === 'shevin krim') {
      return '🪒 Shaving creams and foams available.';
    }
    else if (text === 'pad' || text === 'pads') {
      return '🩸 Sanitary napkins (Eva, Fems) available in Personal Care.';
    }
    else if (text === 'pampers' || text === 'diaper') {
      return '👶 Baby diapers (Velona, Pampers) in all sizes available.';
    }
    else if (text === 'pen' || text === 'pena') {
      return '🖊️ Blue, black, and red pens available in Stationery.';
    }
    else if (text === 'pencil' || text === 'pansala') {
      return '✏️ HB pencils and color pencil boxes available.';
    }
    else if (text === 'eraser' || text === 'makana') {
      return '🧽 Erasers and sharpeners available.';
    }
    else if (text === 'ruler' || text === 'rula') {
      return '📏 6-inch and 12-inch rulers available.';
    }
    else if (text === 'a4' || text === 'kola') {
      return '📄 A4 paper bundles available in Stationery.';
    }
    else if (text === 'book' || text === 'potha') {
      return '📓 Exercise books and CR books available.';
    }
    else if (text === 'file' || text === 'fail') {
      return '📁 Clear files and clip files available.';
    }
    else if (text === 'glue' || text === 'gam') {
      return '🧴 Paper glue and super glue available.';
    }
    else if (text === 'tape' || text === 'tep') {
      return '🩹 Sellotape and masking tape available.';
    }
    else if (text === 'scissors' || text === 'kathura') {
      return '✂️ Stationery scissors available.';
    }
    else if (text === 'papadam' || text === 'pappadam') {
      return '🍘 Crispy papadam packets available in Grocery.';
    }
    else if (text === 'soya' || text === 'soya miti') {
      return '🥣 Soya meat packets in various flavors available.';
    }
    else if (text === 'karawala' || text === 'dry fish') {
      return '🐟 Keeramin, Salaya, and Balaya dry fish available.';
    }
    else if (text === 'maldive fish' || text === 'umbalakada') {
      return '🐟 Premium Maldive fish chips and pieces available.';
    }
    else if (text === 'goraka' || text === 'goraka') {
      return '🟤 Dried goraka paste and pieces available.';
    }
    else if (text === 'tamarind' || text === 'siyambala') {
      return '🟤 Tamarind paste and seedless tamarind packs available.';
    }
    else if (text === 'treacle' || text === 'kithul pani') {
      return '🍯 Pure kithul treacle available in glass bottles.';
    }
    else if (text === 'jaggery' || text === 'hakuru') {
      return '🍬 Kithul and coconut jaggery available.';
    }
    else if (text === 'sago' || text === 'sau') {
      return '🍚 Sago pearls available for making sweets.';
    }
    else if (text === 'mung' || text === 'mun ata') {
      return '🌱 Green gram (Mung beans) available in 500g packs.';
    }
    else if (text === 'kadala' || text === 'chickpeas') {
      return '🌰 Chickpeas (Kadala) available in 500g and 1kg packs.';
    }
    else if (text === 'cowpea' || text === 'kaupi') {
      return '🫘 Red and white cowpea available.';
    }
    else if (text === 'kurakkan' || text === 'kurakkan') {
      return '🌾 Pure kurakkan flour available.';
    }
    else if (text === 'ulundu' || text === 'ulundu') {
      return '🥯 Ulundu flour available for making vadai/thosai.';
    }
    else if (text === 'sudu lunu' || text === 'garlic') {
      return '🧄 Fresh garlic available per 100g/500g.';
    }
    else if (text === 'ratu lunu' || text === 'red onion') {
      return '🧅 Premium red onions available.';
    }
    else if (text === 'b lunu' || text === 'bombay onion') {
      return '🧅 Bombay onions available per kg.';
    }
    else if (text === 'thunapaha' || text === 'curry powder') {
      return '🍛 Roasted and unroasted curry powder available.';
    }
    else if (text === 'kaha kudu' || text === 'turmeric') {
      return '🟡 Pure turmeric powder available.';
    }
    else if (text === 'miris kudu' || text === 'chili powder') {
      return '🌶️ Red chili powder and roasted chili powder available.';
    }
    else if (text === 'keli miris' || text === 'chili flakes') {
      return '🌶️ Chili flakes available for spicy dishes.';
    }
    else if (text === 'uluhaal' || text === 'fenugreek') {
      return '🌾 Fenugreek (Uluhaal) available in Spices.';
    }
    else if (text === 'aba kudu' || text === 'mustard powder') {
      return '🟡 Mustard powder available.';
    }
    else if (text === 'suduru' || text === 'cumin') {
      return '🌿 Cumin (Suduru) seeds and powder available.';
    }
    else if (text === 'mahaduru' || text === 'fennel') {
      return '🌿 Fennel (Mahaduru) seeds available.';
    }
    else if (text === 'kurundu' || text === 'cinnamon') {
      return '🪵 Pure Ceylon Cinnamon available.';
    }
    else if (text === 'karabu nati' || text === 'cloves') {
      return '🤎 Cloves available in the Spices section.';
    }
    else if (text === 'ensal' || text === 'cardamom') {
      return '🌿 Cardamom pods available.';
    }
    else if (text === 'sadikka' || text === 'nutmeg') {
      return '🌰 Nutmeg and mace available.';
    }
    else if (text === 'goraka' || text === 'garcinia') {
      return '🟤 Goraka available for curries.';
    }
    else if (text === 'siyambala' || text === 'tamarind') {
      return '🟤 Tamarind available in packets.';
    }
    else if (text === 'karapincha' || text === 'curry leaves') {
      return '🍃 Fresh curry leaves available.';
    }
    else if (text === 'rampe' || text === 'pandan') {
      return '🌿 Fresh pandan leaves available.';
    }
    else if (text === 'sera' || text === 'lemongrass') {
      return '🌾 Fresh lemongrass available.';
    }
    else if (text === 'pol kiri' || text === 'coconut milk') {
      return '🥥 Liquid coconut milk and powder available.';
    }
    else if (text === 'pol thel' || text === 'coconut oil') {
      return '🥥 Pure coconut oil available in bottles.';
    }
    else if (text === 'meekiri' || text === 'curd') {
      return '🏺 Fresh buffalo curd available in clay pots.';
    }
    else if (text === 'kithul pani' || text === 'treacle') {
      return '🍯 Pure kithul treacle available.';
    }
    else if (text === 'hakuru' || text === 'jaggery') {
      return '🍬 Kithul and coconut jaggery available.';
    }
    else if (text === 'thala' || text === 'sesame') {
      return '🌾 Sesame seeds and sesame oil available.';
    }
    else if (text === 'kaju' || text === 'cashew') {
      return '🥜 Cashew nuts available in 100g packs.';
    }
    else if (text === 'rata kaju' || text === 'peanut') {
      return '🥜 Peanuts available in Snacks.';
    }
    else if (text === 'kottu' || text === 'kottu mee') {
      return '🍜 Prima Kottu Mee available in all flavors.';
    }
    else if (text === 'maggi' || text === 'magi') {
      return '🍜 Maggi noodles and coconut milk powder available.';
    }
    else if (text === 'samahan' || text === 'samahan') {
      return '☕ Samahan herbal packets available for colds.';
    }
    else if (text === 'pas panguwa' || text === 'paspanguwa') {
      return '🌿 Paspanguwa herbal packets available.';
    }
    else if (text === 'siddhalepa' || text === 'siddhalepa') {
      return '🧴 Siddhalepa balm available in Pharmacy.';
    }
    else if (text === 'panadol' || text === 'panadol') {
      return '💊 Panadol cards available in Pharmacy.';
    }
    else if (text === 'harpic' || text === 'harpic') {
      return '🚽 Harpic cleaner available.';
    }
    else if (text === 'vim' || text === 'vim') {
      return '🧼 Vim dishwashing liquid available.';
    }
    else if (text === 'sunlight' || text === 'sunlight') {
      return '🧼 Sunlight soap available.';
    }
    else if (text === 'lux' || text === 'lux') {
      return '🧼 Lux beauty soap available.';
    }
    else if (text === 'lifebuoy' || text === 'lifebuoy') {
      return '🧼 Lifebuoy soap and handwash available.';
    }
    else if (text === 'signal' || text === 'signal') {
      return '🪥 Signal toothpaste available.';
    }
    else if (text === 'cologn' || text === 'baby cheramy') {
      return '👶 Baby Cheramy cologne and soap available.';
    }
    else if (text === 'pampers' || text === 'velona') {
      return '👶 Velona cuddles and diapers available.';
    }
    else if (text === 'cart' || text === 'bag') {
      return '🛒 Go to your Cart icon at the top right to view your added items and checkout!';
    }
    else if (text === 'box' || text === 'parcel') {
      return '📦 Your order will be packed safely in a clean box or eco-friendly bag.';
    }
    else if (text === 'bill' || text === 'receipt') {
      return '🧾 You will receive an email receipt and a physical bill inside your delivery package.';
    }
    else if (text === 'pay' || text === 'gewanna') {
      return '💳 You can pay via COD, Card (PayPal), or LankaQR at the checkout step.';
    }
    else if (text === 'card' || text === 'visa') {
      return '💳 We accept Visa, Mastercard, and Amex via our secure PayPal gateway.';
    }
    else if (text === 'master' || text === 'amex') {
      return '💳 Yes, Mastercard and Amex are accepted via the Checkout page.';
    }
    else if (text === 'cash' || text === 'salli') {
      return '💵 Yes, Cash on Delivery is perfectly fine! Just select COD at checkout.';
    }
    else if (text === 'cod' || text === 'delivery cash') {
      return '💵 Cash on Delivery (COD) is available for all orders island-wide.';
    }
    else if (text === 'qr' || text === 'lankaqr') {
      return '📲 You can scan and pay using LankaQR with any local banking app at checkout.';
    }
    else if (text === 'bank' || text === 'transfer') {
      return '🏦 For bank transfers, select COD and call us. We will provide our account details.';
    }
    else if (text === 'app' || text === 'application') {
      return '📱 Our website works perfectly on your phone browser like a native app!';
    }
    else if (text === 'web' || text === 'site') {
      return '🌐 You are currently on our official website. Browse categories to start shopping.';
    }
    else if (text === 'link' || text === 'share') {
      return '🔗 You can copy the URL in your browser to share our site with friends!';
    }
    else if (text === 'error' || text === 'bug') {
      return '🛠️ If you face any errors, please refresh the page or call support at 011-2345678.';
    }
    else if (text === 'slow' || text === 'stuck') {
      return '🐢 We might be facing heavy traffic. Try refreshing the page in a minute.';
    }
    else if (text === 'fail' || text === 'drop') {
      return '⚠️ If your payment dropped, do not worry. Check your Orders tab or try again.';
    }
    else if (text === 'hack' || text === 'scam') {
      return '🔒 Our site is 100% secure. We do not store card data on our servers.';
    }
    else if (text === 'fake' || text === 'boruwak') {
      return '🛡️ We are a registered Sri Lankan business. We guarantee genuine products and service.';
    }
    else if (text === 'trust' || text === 'wiswasa') {
      return '🤝 Thousands of customers trust us daily. Select COD if you want to pay after receiving!';
    }
    else if (text === 'map' || text === 'location') {
      return '📍 We deliver from our central warehouse. Ensure your delivery address is accurate!';
    }
    else if (text === 'track' || text === 'status') {
      return '📦 Track your order by going to "My Profile" > "Orders".';
    }
    else if (text === 'driver' || text === 'rider') {
      return '🛵 Our rider will contact you when they are close to your location.';
    }
    else if (text === 'van' || text === 'lorry') {
      return '🚚 Large bulk orders are delivered via our delivery vans.';
    }
    else if (text === 'bike' || text === 'motorcycle') {
      return '🛵 Most standard grocery orders are delivered quickly via delivery bikes.';
    }
    else if (text === 'time' || text === 'welawa') {
      return '⏱️ Deliveries take place from 8 AM to 6 PM daily.';
    }
    else if (text === 'hour' || text === 'min') {
      return '⏳ Express delivery takes just a few hours depending on traffic.';
    }
    else if (text === 'hi' || text === 'hello') {
      return '👋 Hello! Type a product name or a question to get started.';
    }
    else if (text === 'bye' || text === 'gihin ennam') {
      return '👋 Goodbye! Have a fresh and wonderful day.';
    }
    else if (text === 'yes' || text === 'ow') {
      return '👍 Okay! Let me know if you need anything else.';
    }
    else if (text === 'no' || text === 'na') {
      return '🛑 Alright! I am here if you change your mind.';
    }
    else if (text === 'ok' || text === 'hari') {
      return '👌 Great! Use the search bar to find more items.';
    }
    else if (text === 'thanks' || text === 'istuti') {
      return '😊 You are welcome! Happy shopping.';
    }
    else if (text === 'thx' || text === 'ty') {
      return '😊 Anytime!';
    }
    else if (text === 'sure' || text === 'aniwa') {
      return '💯 Awesome!';
    }
    else if (text === 'maybe' || text === 'samaharawita') {
      return '🤔 Take your time and decide!';
    }
    else if (text === 'true' || text === 'aththa') {
      return '✅ Yes, exactly!';
    }
    else if (text === 'false' || text === 'boru') {
      return '❌ Let me know what you are looking for specifically.';
    }
    else if (text === 'never' || text === 'kawadawath na') {
      return '🛑 Got it!';
    }
    else if (text === 'always' || text === 'hamadama') {
      return '🔄 We are always here to serve you!';
    }
    else if (text === 'fine' || text === 'hodai') {
      return '👍 Good to hear!';
    }
    else if (text === 'bad' || text === 'narukai') {
      return '😔 Sorry to hear that. Contact our hotline if there is an issue.';
    }
    else if (text === 'good' || text === 'niyamai') {
      return '⭐ Thank you!';
    }
    else if (text === 'nice' || text === 'lassanai') {
      return '🌸 Thanks! We aim to please.';
    }
    else if (text === 'superb' || text === 'supiri') {
      return '🚀 Fantastic!';
    }
    else if (text === 'awul' || text === 'case') {
      return '⚠️ If something is wrong, please let our support team know via 011-2345678.';
    }
    else if (text === 'wtf' || text === 'omg') {
      return '😯 Surprised? We have amazing deals running right now!';
    }
    else if (text === 'lol' || text === 'haha') {
      return '😂 Glad to make you smile!';
    }
    else if (text === 'hehe' || text === 'hihi') {
      return '😁';
    }
    else if (text === 'wow' || text === 'ammo') {
      return '🤩 We love surprises! Check out our clearance section for more WOW deals.';
    }
    else if (text === 'yay' || text === 'jaya') {
      return '🎉 Woohoo!';
    }

    else {
      return 'Im still learning! 🌱 Please use the search bar to find products, or call our hotline at 011-2345678 for more details.';
    }
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotResponse(input);
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50">
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-xl w-80 sm:w-[350px] rounded-3xl premium-shadow border border-slate-200 mb-4 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right">
          
          <div className="bg-gradient-premium text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <span className="text-2xl leading-none block">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight tracking-tight">Lanka Bot</h3>
                <div className="flex items-center space-x-1 mt-0.5">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <p className="text-xs text-green-100 font-medium">Online | Ready to help</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-xl font-bold"
            >
              &times;
            </button>
          </div>

          <div className="h-96 p-5 overflow-y-auto bg-slate-50 flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-green-600 text-white rounded-br-sm' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-sm font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 py-3 px-4 rounded-2xl rounded-bl-sm shadow-sm flex space-x-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessageHandler} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-grow bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-green-600 text-white rounded-full w-11 h-11 flex items-center justify-center hover:bg-green-700 transition-transform active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-md"
            >
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <div className="relative group">
          <div className="absolute bottom-16 right-0 md:right-2 w-48 bg-white text-slate-800 text-sm font-bold px-4 py-3 rounded-2xl premium-shadow border border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-10">
            Need help? Chat with us 👋
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-slate-100 transform rotate-45"></div>
          </div>

          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-premium text-white w-16 h-16 rounded-full premium-shadow hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-10 border-4 border-white"
          >
            <span className="text-3xl leading-none drop-shadow-md">🤖</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;