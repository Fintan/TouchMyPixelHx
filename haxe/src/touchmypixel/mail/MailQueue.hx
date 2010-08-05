/**
 * ...
 * @author Tarwin Stroh-Spijer
 */

package com.touchmypixel.mail;
import poko.Db;

class MailQueue 
{
	private var smtp:SimpleSmtp;
	private var db:Db;
	private var table:String;
	
	public function new(simpleSmtp:SimpleSmtp, database:Db, dbTable:String) 
	{
		smtp = simpleSmtp;
		db = database;
		table = dbTable;
	}
	
	public function getQueueCount():Int
	{
		return(1);
	}

	public function setBufferSize(size:Int = 10)
	{
		
	}

    function sendMailsInQueue(limit = -1, offset = 0, tryTimes = 25, callback = null)
    {
        $this->container->setOption($limit, $offset, $try);
        while ($mail = $this->get()) {
            $this->container->countSend($mail);

            $result = $this->sendMail($mail, true);
            if (PEAR::isError($result)) {
                //remove the problematic mail from the buffer, but don't delete
                //it from the db: it might be a temporary issue.
                $this->container->skip();
                PEAR::raiseError(
                    'Error in sending mail: '.$result->getMessage(),
                    MAILQUEUE_ERROR_CANNOT_SEND_MAIL, PEAR_ERROR_TRIGGER,
                    E_USER_NOTICE
                );
            } else {
                //take care of callback first, as it may need to retrieve extra data
                //from the mail_queue table.
                if ($callback !== null) {
                    call_user_func($callback,
                        array('id' => $mail->getId(),
                              'queued_as' => $this->queued_as,
                              'greeting'  => $this->greeting));
                }
                if ($mail->isDeleteAfterSend()) {
                    $this->deleteMail($mail->getId());
                }
            }
            if (isset($this->mail_options['delay'])
                && $this->mail_options['delay'] > 0) {
                sleep($this->mail_options['delay']);
            }
        }
        if (!empty($this->mail_options['persist']) && is_object($this->send_mail)) {
            $this->send_mail->disconnect();
        }
        return true;		
	}
}