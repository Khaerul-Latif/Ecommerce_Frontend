import React from 'react'
import  styles from '../index.module.css'
import UpdateReview from '@/components/review-produk/update'

const ReviewProduk = () => {
 return(
  <div className={styles.container}>
   <UpdateReview/>
  </div>
 )
}

export default ReviewProduk